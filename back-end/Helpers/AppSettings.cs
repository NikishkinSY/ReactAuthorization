namespace WebApi.Helpers
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string SmtpServer { get; set; }
        public int SmtpServerPort { get; set; }
    }
}