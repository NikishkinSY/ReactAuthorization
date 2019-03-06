using System;
using System.Net.Http;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using WebApi.Helpers;
using WebApi.Services;

namespace WebApi.Tests
{
    [TestFixture]
    public class EmailServiceTests
    {
        private IEmailService _emailService;

        [SetUp]
        public void Setup()
        {
            var provider = ConfigurateDependencyInjection.Configurate();
            _emailService = (IEmailService)provider.GetService(typeof(IEmailService));
        }

        [TestCase("testmailforapp2@gmail.com")]
        public void EmailSend(string email)
        {
            _emailService.SendEmail(email, "test", "test");
        }
    }
}
