using System.Threading.Tasks;

namespace WebApi.Services
{
    public interface IEmailService
    {
        void SendEmail(string email, string header, string message);
    }
}
