using System;
using System.Threading.Tasks;
using WebApi.Entities;

namespace WebApi.Services
{
    public interface IUserService
    {
        Task<User> AuthenticateAsync(string username, string password);
        Task<User> GetByIdAsync(int id);
        Task<User> CreateAsync(User user, string password);
        Task ConfirmRegistrationAsync(int id, Guid guid);
        Task DeleteAsync(int id);

        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
        bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt);
    }
}
