using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : Controller
    {
        [HttpGet("public")]
        public IActionResult Public()
        {
            return Content("Public");
        }

        [Authorize]
        [HttpGet("private")]
        public IActionResult Private()
        {
            return Content("Private");
        }
    }
}
