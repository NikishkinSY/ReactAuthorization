namespace WebApi.Helpers
{
    public class AppSettings
    {
        public string WebServer { get; set; }
        public string Secret { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string SmtpServer { get; set; }
        public int SmtpServerPort { get; set; }
        public string UserNotFound { get; set; }
        public string EmailIsTaken { get; set; }
        public string EmailAndPasswordAreRequired { get; set; }
        public string UsernameOrPasswordIsIncorrect { get; set; }
        public string ConfirmationEmailSent { get; set; }
        public string EmailIsConfirmed { get; set; }
    }
}