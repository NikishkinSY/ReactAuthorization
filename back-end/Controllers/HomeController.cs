﻿using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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
