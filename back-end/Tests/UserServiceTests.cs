using NUnit.Framework;
using WebApi.Entities;
using WebApi.Services;

namespace WebApi.Tests
{
    public class UserServiceTests
    {
        private IUserService _userService;

        [SetUp]
        public void Setup()
        {
            var provider = ConfigurateDependencyInjection.Configurate();
            _userService = (IUserService)provider.GetService(typeof(IUserService));
        }

        [TestCase("testmailforapp2@gmail.com", "Qwerty123!")]
        public void EmailSend(string email, string password)
        {
            var user = _userService.CreateAsync(new User { Email = email }, password).Result;
            _userService.ConfirmRegistrationAsync(user.Id, user.ConfirmationGuid);
            var authUser = _userService.AuthenticateAsync(user.Email, password).Result;
            var byIdUser = _userService.GetByIdAsync(user.Id).Result;
            _userService.DeleteAsync(user.Id);

            Assert.NotNull(user);
            Assert.NotNull(authUser);
            Assert.NotNull(byIdUser);
        }
    }
}
