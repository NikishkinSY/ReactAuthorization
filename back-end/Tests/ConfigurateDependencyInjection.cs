using Microsoft.EntityFrameworkCore;
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
            var appSettingsSection = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddDbContext<DataContext>(x => x.UseInMemoryDatabase("TestDb"));
            return services.BuildServiceProvider();
        }
    }
}
