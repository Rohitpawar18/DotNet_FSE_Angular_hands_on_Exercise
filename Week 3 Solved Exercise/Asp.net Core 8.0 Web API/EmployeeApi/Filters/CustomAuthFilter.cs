using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace EmployeeApi.Filters
{
    public class CustomAuthFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.HttpContext.Request.Headers.ContainsKey("Authorization"))
            {
                context.Result = new BadRequestObjectResult("Invalid Request - No Auth Token");
                return;
            }

            string authHeaderValue = context.HttpContext.Request.Headers["Authorization"].ToString();

            if (!authHeaderValue.Contains("Bearer"))
            {
                context.Result = new BadRequestObjectResult("Invalid Request - Token Present But Bearer Unavailable");
                return;
            }

            base.OnActionExecuting(context);
        }
    }
}
