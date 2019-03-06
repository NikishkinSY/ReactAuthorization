using System;

namespace WebApi.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public bool IsRegistered { get; set; }
        public Guid ConfirmationGuid { get; set; }
    }
}