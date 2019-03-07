using System;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace WebApi.Helpers
{
    public class GlobalExceptionFilter: IExceptionFilter
    {
        private readonly ILogger<GlobalExceptionFilter> _logger;

        public GlobalExceptionFilter(ILogger<GlobalExceptionFilter> logger)
        {
            _logger = logger;
        }

        public void OnException(ExceptionContext context)
        {
            _logger.LogError(context.Exception, context.Exception.Message);
            HttpStatusCode status;
            string message;

            switch (context.Exception)
            {
                case AppException ex:
                {
                    message = ex.Message;
                    status = HttpStatusCode.BadRequest;
                    break;
                }
                case UnauthorizedAccessException _:
                {
                    message = "Unauthorized Access";
                    status = HttpStatusCode.Unauthorized;
                    break;
                }
                default:
                {
                    message = "Internal Server Error";
                    status = HttpStatusCode.InternalServerError;
                    break;
                }
            }

            HttpResponse response = context.HttpContext.Response;
            response.StatusCode = (int)status;
            response.ContentType = "application/json";
            response.WriteAsync(message);

            context.ExceptionHandled = true;
        }
    }
}
