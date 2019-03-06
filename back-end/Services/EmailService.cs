﻿using System;
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

        public void SendEmail(string email, string header, string message)
        {
            try
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
                    EnableSsl = true
                };

                smtp.Send(mailMessage);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
