using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace EmployeeApi.Filters
{
    public class CustomExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            string exceptionMessage = context.Exception.Message;
            string exceptionStackTrace = context.Exception.StackTrace ?? string.Empty;

            string logContent = $"Time : {DateTime.Now}{Environment.NewLine}"+
                                $"Message : {exceptionMessage}{Environment.NewLine}"+
                                $"StackTrace : {exceptionStackTrace}{Environment.NewLine}"+
                                $"----------------------------------------{Environment.NewLine}";

            string logFilePath = Path.Combine(AppContext.BaseDirectory, "ExceptionLog.txt");
            File.AppendAllText(logFilePath, logContent);

            context.Result = new ObjectResult(new
            {
                Statuscode = 500,
                Message = "An unexpected error occurred : " + exceptionMessage
            })
            {
                StatusCode = 500
            };

            context.ExceptionHandled = true;
        }
    }
}
