using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SwaggerDemoApi.Models;

namespace SwaggerDemoApi.Controllers
{
    [Route("api/emp")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        public static List<Employee> _employees = new List<Employee>
        {
            new Employee { Id = 1, Name = "Alice", Department = "IT", Salary = 55000 },
            new Employee { Id = 2, Name = "Bob", Department = "HR", Salary = 48000 },
            new Employee { Id = 3, Name = "Charlie", Department = "Finance", Salary = 60000 }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Employee>> Get()
        {
            return Ok(_employees);
        }

        [HttpGet("{id}")]
        public ActionResult<Employee> Get(int id) 
        {
            var emp = _employees.FirstOrDefault(e => e.Id == id);
            if(emp == null)
            {
                return NotFound();
            }
            return Ok(emp);
        }
    }
}
