using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Business.api.Models;
using Business.api.Data;
using Swashbuckle.AspNetCore.Swagger;
using System.IO;
using Microsoft.Extensions;
using Microsoft.Extensions.PlatformAbstractions;
using NLog.Extensions.Logging;
using NLog.Web;
using Business.api.Middleware;


namespace Business.api
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

            // Add service and create Policy with options
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });


            services.AddDbContext<TodoContext>(opt => opt.UseInMemoryDatabase("TodoList"));
           

            services.AddMvc();


            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "ToDo API",
                    Description = "ASP.NET Core Web API",
                    TermsOfService = "None",
                    Contact = new Contact { Name = "Tech Alpha", Email = "tech.alpha.info@gmail.com", Url = "https://www.techalpha.co.uk" },
                    License = new License { Name = "Use under MIT", Url = "https://opensource.org/licenses/MIT" }
                });

                // Set the comments path for the Swagger JSON and UI.
                var basePath = PlatformServices.Default.Application.ApplicationBasePath;
                var xmlPath = Path.Combine(basePath, "Business.api.xml");
                c.IncludeXmlComments(xmlPath);
            });

         
        }



        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddNLog();
           
            app.AddNLogWeb();

            env.ConfigureNLog("nlog.config");

            // Global policy - assign here or on each controller
            app.UseCors("CorsPolicy");


            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

          

            app.UseStaticFiles();

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

         

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Add logging middleware - logs request / response to the output window during debug....
            app.UseMiddleware<LogResponseMiddleware>();
            app.UseMiddleware<LogRequestMiddleware>();

            app.UseMvc(routes =>
            {

                routes.MapRoute(
                    name: "create",
                    template: "api/todo/create/");

                routes.MapRoute(
                     name: "default",
                     template: "api/{controller=Home}/{action=Index}/{id?}");
             });
        }



      


    }
}

