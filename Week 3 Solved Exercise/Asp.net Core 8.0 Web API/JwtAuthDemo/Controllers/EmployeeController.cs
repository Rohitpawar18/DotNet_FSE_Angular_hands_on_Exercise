using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using JwtAuthDemo.Models;

namespace JwtAuthDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "POC")]
    public class EmployeeController : ControllerBase
    {
        private readonly List<Employee> _employees;

        public EmployeeController()
        {
            _employees = new List<Employee>
            {
                new Employee
                {
                    Id = 1,
                    Name = "Alice",
                    Salary = 55000,
                    Permanent = true,
                    Department = Department.IT,
                    Skills = new List<Skill> { new Skill { Id = 1, Name = "C#" } },
                    DateOfBirth = new DateTime(1990, 5, 12)
                },
                new Employee
                {
                    Id = 2,
                    Name = "Bob",
                    Salary = 48000,
                    Permanent = false,
                    Department = Department.HR,
                    Skills = new List<Skill> { new Skill { Id = 2, Name = "Recruitment" } },
                    DateOfBirth = new DateTime(1988, 8, 23)
                }
            };
        }

        private List<Employee> GetStandardEmployeeList()
        {
            return _employees;
        }

        // GET: api/employee
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        public ActionResult<List<Employee>> Get()
        {
            return Ok(GetStandardEmployeeList());
        }
    }
}