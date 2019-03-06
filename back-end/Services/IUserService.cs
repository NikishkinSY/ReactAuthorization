using System;
using WebApi.Entities;

namespace WebApi.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        User GetById(int id);
        User Create(User user, string password);
        void ConfirmRegistration(int id, Guid guid);
    }
}
