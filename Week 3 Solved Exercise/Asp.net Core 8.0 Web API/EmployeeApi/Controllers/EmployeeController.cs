using EmployeeApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EmployeeApi.Filters;

namespace EmployeeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [CustomAuthFilter]
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
                    Skills = new List<Skill>
                    {
                        new Skill{ Id = 1, Name = "C#"},
                        new Skill { Id = 2, Name = "ASP.NET Core" }
                    },
                    DateOfBirth = new DateTime(1990, 5, 12)
                },
                new Employee
                {
                    Id = 2,
                    Name = "Bob",
                    Salary = 48000,
                    Permanent = false,
                    Department = Department.HR,
                    Skills = new List<Skill>
                    {
                        new Skill { Id = 3, Name = "Recruitment" }
                    },
                    DateOfBirth = new DateTime(1988, 8, 23)
                },
                new Employee
                {
                    Id = 3,
                    Name = "Charlie",
                    Salary = 60000,
                    Permanent = true,
                    Department = Department.Finance,
                    Skills = new List<Skill>
                    {
                        new Skill { Id = 4, Name = "Excel" },
                        new Skill { Id = 5, Name = "SAP" }
                    },
                    DateOfBirth = new DateTime(1985, 3, 30)
                }
            };
        }

        private List<Employee> GetStandardEmployeeList()
        {
            return _employees;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        public ActionResult<List<Employee>> Get()
        {
            throw new Exception("Test exception thrown deliberately to check CustomExceptionFilter");

            List<Employee> employees = GetStandardEmployeeList();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public ActionResult<Employee> Get(int id) 
        {
            var emp = GetStandardEmployeeList().FirstOrDefault(e => e.Id == id);
            if(emp == null)
            {
                return NotFound();
            }
            return Ok(emp);
        }

        [HttpPost]
        [ProducesResponseType(201)]
        public ActionResult Post([FromBody] Employee employee)
        {
            _employees.Add(employee);
            return CreatedAtAction(nameof(Get), new { id = employee.Id}, employee);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public ActionResult Put(int id, [FromBody] Employee employee)
        {
            var existing = _employees.FirstOrDefault(e => e.Id == id);
            if(existing == null)
            {
                return NotFound();
            }

            existing.Name = employee.Name;
            existing.Salary = employee.Salary;
            existing.Permanent = employee.Permanent;
            existing.Department = employee.Department;
            existing.Skills = employee.Skills;
            existing.DateOfBirth = employee.DateOfBirth;

            return NoContent();
        }
    }
}
