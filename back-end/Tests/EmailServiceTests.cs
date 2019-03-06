using System;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;
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
            _emailService.SendEmailAsync(email, "test", "test");
        }
    }
}
