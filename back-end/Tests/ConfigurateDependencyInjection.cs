using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WebApi.Helpers;
using WebApi.Services;

namespace WebApi.Tests
{
    public class ConfigurateDependencyInjection
    {
        public static ServiceProvider Configurate()
        {
            var services = new ServiceCollection();
            var appSettingsSection = new ConfigurationBuilder().Build().GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IEmailService, EmailService>();
            return services.BuildServiceProvider();
        }
    }
}
