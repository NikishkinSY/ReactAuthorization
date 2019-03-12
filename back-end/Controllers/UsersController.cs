using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebApi.Dtos;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UsersController(
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings,
            IEmailService emailService)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _emailService = emailService;
        }
        
        [HttpPost("signin")]
        public async Task<IActionResult> Signin([FromBody]UserDto userDto)
        {
            var user = await _userService.AuthenticateAsync(userDto.Email, userDto.Password);

            if (user == null)
            {
                throw new AppException(_appSettings.UsernameOrPasswordIsIncorrect);
            }
                
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new [] 
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            
            return Ok(new {
                Id = user.Id,
                Email = user.Email,
                Token = tokenString
            });
        }
        
        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody]UserDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            var guid = _userService.GenerateConfirmationGuid();
            var link = $"{_appSettings.WebServer}/confirmation/{user.Email}/{guid}";
            await _emailService.SendEmailAsync(user.Email, "Confirm registration", $"<a href='{link}'>Click here</a>");
            await _userService.CreateAsync(user, userDto.Password, guid);
            
            return Ok(_appSettings.ConfirmationEmailSent);
        }
        
        [HttpGet("confirm")]
        public async Task<IActionResult> ConfirmRegistration(string email, Guid guid)
        {
            await _userService.ConfirmRegistrationAsync(email, guid);
            return Ok(_appSettings.EmailIsConfirmed);
        }
    }
}
