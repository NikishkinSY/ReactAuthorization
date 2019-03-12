using System;
using NUnit.Framework;
using NUnit.Framework.Constraints;
using WebApi.Entities;
using WebApi.Helpers;
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

        [Test]
        public void GenerateGuid()
        {
            var guid = _userService.GenerateConfirmationGuid();

            Assert.IsTrue(guid != Guid.Empty);
        }

        [TestCase("testmailforapp2@gmail.com", "Qwerty123!")]
        public void CreateDeleteUser(string email, string password)
        {
            var guid = _userService.GenerateConfirmationGuid();
            var user = _userService.CreateAsync(new User { Email = email }, password, guid);
            _userService.DeleteAsync(user.Id);

            Assert.NotNull(user);
        }

        [TestCase("testmailforapp2@gmail.com", "Qwerty123!")]
        public void CreateDeleteUserTwice(string email, string password)
        {
            var guid = _userService.GenerateConfirmationGuid();
            var user = _userService.CreateAsync(new User { Email = email }, password, guid).Result;
            Assert.ThrowsAsync<AppException>(async () => await _userService.CreateAsync(new User { Email = email }, password, guid));
            
            _userService.DeleteAsync(user.Id);
            Assert.NotNull(user);
        }

        [TestCase("", "Qwerty123!")]
        [TestCase("testmailforapp2@gmail.com", "")]
        [TestCase("", "")]
        public void CreateDeleteUserWithEmptyArgs(string email, string password)
        {
            var guid = _userService.GenerateConfirmationGuid();
            Assert.ThrowsAsync<AppException>(async () => await _userService.CreateAsync(new User { Email = email }, password, guid));
        }
        
        [TestCase("testmailforapp2@gmail.com", "Qwerty123!")]
        public void ConfirmRegistrationUser(string email, string password)
        {
            var guid = _userService.GenerateConfirmationGuid();
            var user = _userService.CreateAsync(new User { Email = email }, password, guid).Result;
            _userService.ConfirmRegistrationAsync(user.Email, user.ConfirmationGuid);
            _userService.DeleteAsync(user.Id);
        }

        [TestCase("testmailforapp2@gmail.com", "Qwerty123!", null)]
        [TestCase("testmailforapp2@gmail.com", "Qwerty123!", "wrongEmail@gmail.com")]
        public void ConfirmRegistrationEmptyUser(string email, string password, string confirmationEmail)
        {
            var guid = _userService.GenerateConfirmationGuid();
            var user = _userService.CreateAsync(new User { Email = email }, password, guid).Result;

            Assert.ThrowsAsync<AppException>(async () => await _userService.ConfirmRegistrationAsync(confirmationEmail ?? email, Guid.NewGuid()));

            _userService.DeleteAsync(user.Id);
        }

        [TestCase("testmailforapp2@gmail.com", "Qwerty123!")]
        [TestCase("", "Qwerty123!")]
        [TestCase("testmailforapp2@gmail.com", "")]
        public void Authenticate(string email, string password)
        {
            var authUser = _userService.AuthenticateAsync(email, password).Result;

            Assert.IsNull(authUser);
        }

        [TestCase("testmailforapp2@gmail.com", "Qwerty123!")]
        public void AuthenticateWithCreating(string email, string password)
        {
            var guid = _userService.GenerateConfirmationGuid();
            var user = _userService.CreateAsync(new User { Email = email }, password, guid).Result;
            var authUser = _userService.AuthenticateAsync(email, password).Result;
            _userService.DeleteAsync(user.Id);

            Assert.IsNull(authUser);
        }

        [TestCase("testmailforapp2@gmail.com", "Qwerty123!")]
        public void AuthenticateWithCreatingAndConfirmation(string email, string password)
        {
            var guid = _userService.GenerateConfirmationGuid();
            var user = _userService.CreateAsync(new User { Email = email }, password, guid).Result;
            _userService.ConfirmRegistrationAsync(user.Email, user.ConfirmationGuid);
            var authUser = _userService.AuthenticateAsync(email, password).Result;
            _userService.DeleteAsync(user.Id);

            Assert.IsNotNull(authUser);
        }

        [TestCase(1)]
        public void GetByIdWithCreating(int id)
        {
            var byIdUser = _userService.GetByIdAsync(id).Result;

            Assert.IsNull(byIdUser);
        }

        [TestCase("testmailforapp2@gmail.com", "Qwerty123!")]
        public void GetByIdWithCreating(string email, string password)
        {
            var guid = _userService.GenerateConfirmationGuid();
            var user = _userService.CreateAsync(new User { Email = email }, password, guid).Result;
            var byIdUser = _userService.GetByIdAsync(user.Id).Result;
            _userService.DeleteAsync(user.Id);

            Assert.NotNull(byIdUser);
        }

        [TestCase("Qwerty123!")]
        public void VerifyGenerateHash(string password)
        {
            _userService.CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
            var result = _userService.VerifyPasswordHash(password, passwordHash, passwordSalt);

            Assert.IsNotEmpty(passwordHash);
            Assert.IsNotEmpty(passwordSalt);
            Assert.IsTrue(result);
        }
    }
}
