using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using WebApi.Helpers;

namespace WebApi.Services
{
    public class EmailService: IEmailService
    {
        private readonly AppSettings _appSettings;

        public EmailService(
            IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public async Task SendEmailAsync(string email, string header, string message)
        {
            var from = new MailAddress(_appSettings.Email);
            var to = new MailAddress(email);

            var mailMessage = new MailMessage(from, to)
            {
                Subject = header,
                Body = message,
                IsBodyHtml = true
            };

            var smtp = new SmtpClient(_appSettings.SmtpServer, _appSettings.SmtpServerPort)
            {
                Credentials = new NetworkCredential(_appSettings.Email, _appSettings.Password),
                EnableSsl = _appSettings.EnableSsl
            };

            await smtp.SendMailAsync(mailMessage);
        }
    }
}
