using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Public()
        {
            return Content("Public");
        }

        [Authorize]
        public IActionResult Private()
        {
            return Content("Private");
        }
    }
}
