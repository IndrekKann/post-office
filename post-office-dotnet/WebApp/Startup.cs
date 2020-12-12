using BLL.Services;
using DAL;
using DAL.Helpers;
using DAL.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace WebApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("MsSqlConnection")));

            services.AddScoped<ShipmentRepository>();
            // services.AddScoped<BagRepository>();
            services.AddScoped<ShipmentService>();
            // services.AddScoped<BagService>();

            services.AddControllersWithViews();
            services.AddRazorPages();
            
            services.AddHttpContextAccessor();
            
            services.AddCors(options =>
            {
                options.AddPolicy("CorsAllowAll",
                    builder =>
                    {
                        builder.AllowAnyOrigin();
                        builder.AllowAnyHeader();
                        builder.AllowAnyMethod();
                    });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            UpdateDatabase(app, env, Configuration);
            
            if (env.IsDevelopment() || env.IsStaging())
            {
                app.UseDeveloperExceptionPage();
                // app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                //app.UseHsts();
            }

            app.UseRequestLocalization(options: app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>().Value);
            
            //app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseCors("CorsAllowAll");

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "area",
                    pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");
                
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                
                endpoints.MapRazorPages();
            });
        }
        
        private static void UpdateDatabase(IApplicationBuilder app, IWebHostEnvironment env, IConfiguration configuration)
        {
            using var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();
            using var context = serviceScope.ServiceProvider.GetService<AppDbContext>();
            
            var logger = serviceScope.ServiceProvider.GetService<ILogger<Startup>>();

            if (configuration.GetValue<bool>("AppDataInitialization:DropDatabase"))
            {
                logger.LogInformation("DropDatabase");
                DataInitializer.DeleteDatabase(context);
            }

            if (configuration.GetValue<bool>("AppDataInitialization:MigrateDatabase"))
            {
                logger.LogInformation("MigrateDatabase");
                DataInitializer.MigrateDatabase(context);
            }

            if (configuration.GetValue<bool>("AppDataInitialization:SeedData"))
            {
                logger.LogInformation("SeedData");
                DataInitializer.SeedData(context);
            }
            
        }
    }
}