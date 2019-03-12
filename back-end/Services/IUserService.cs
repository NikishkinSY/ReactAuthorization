using System;
using System.Threading.Tasks;
using WebApi.Entities;

namespace WebApi.Services
{
    public interface IUserService
    {
        Task<User> AuthenticateAsync(string username, string password);
        Task<User> GetByIdAsync(int id);
        Task<User> CreateAsync(User user, string password, Guid confirmationGuid);
        Task ConfirmRegistrationAsync(string email, Guid guid);
        Task DeleteAsync(int id);

        Guid GenerateConfirmationGuid();
        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
        bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt);
    }
}
