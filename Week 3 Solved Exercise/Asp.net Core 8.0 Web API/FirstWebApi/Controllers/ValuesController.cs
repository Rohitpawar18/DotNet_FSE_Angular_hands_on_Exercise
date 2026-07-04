using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FirstWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private static List<String> _values = new List<String> { 
            "Value1", "Value2", "Value3"
        };

        // GET: api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return Ok(_values);
        }

        // GET: api/values/1
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            if (id < 0 || id >= _values.Count)
                return NotFound();

            return Ok(_values[id]);
        }

        // POST: api/values
        [HttpPost]
        public ActionResult Post([FromBody] string value)
        {
            _values.Add(value);
            return CreatedAtAction(nameof(Get), new { id = _values.Count - 1 }, value);
        }

        // PUT: api/values/1
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] string value)
        {
            if (id < 0 || id >= _values.Count)
                return NotFound();

            _values[id] = value;
            return NoContent();
        }

        // DELETE: api/values/1
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            if (id < 0 || id >= _values.Count)
                return NotFound();

            _values.RemoveAt(id);
            return NoContent();
        }
    }
}
