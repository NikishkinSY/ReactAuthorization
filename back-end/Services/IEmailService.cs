using System.Threading.Tasks;

namespace WebApi.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(string email, string header, string message);
    }
}
