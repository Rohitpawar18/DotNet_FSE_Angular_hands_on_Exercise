using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SwaggerDemoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private static List<string> _values = new List<string>
        {
            "Value1", "Value2", "Value3"
        };

        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return Ok(_values);
        }

        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            if(id < 0 || id >= _values.Count)
            {
                return NotFound();
            }

            return Ok(_values[id]);
        }

        [HttpPost]
        public ActionResult Post([FromBody] string value)
        {
            _values.Add(value);
            return CreatedAtAction(nameof(Get), new {id = _values.Count - 1}, value);
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] string value)
        {
            if (id < 0 || id >= _values.Count)
            {
                return NotFound();
            }

            _values[id] = value;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            if(id < 0 || id >= _values.Count)
            {
                return NotFound();
            }

            _values.RemoveAt(id);
            return NoContent();
        }
    }
}
