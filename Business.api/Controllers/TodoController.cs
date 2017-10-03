using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Business.api.Models;
using Business.api.Data;
using System.Linq;
using Microsoft.Extensions.Logging;


namespace Business.api.Controllers
{



    [Produces("application/json")]
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        private readonly TodoContext _context;
        private readonly ILogger _logger;

        public TodoController(TodoContext context, ILogger<TodoController> logger)
        {
            _logger = logger;
            _context = context;

            _logger.LogInformation("ToDo was requested");

           

            if (_context.TodoItems.Count() == 0)
            {
                AddTestData(_context);
                
            }
        }




        private void AddTestData(TodoContext context)
        {
            for (int i = 1; i <= 7; i++)
            {
                var record = new Models.TodoItem
                {
                    //Id = 1,
                    Name = "Name" + i,
                    Details = "Do Task number " + i,
                    IsComplete = false
                };

                context.TodoItems.Add(record);
            }

            context.SaveChanges();
        }




        [HttpGet]
        public IEnumerable<TodoItem> GetAll()
        {

            _logger.LogInformation("ToDo GetAll() was requested");
            return _context.TodoItems.ToList();
        }

        



        [HttpGet("{id}", Name = "GetTodo")]
        public TodoItem GetById(long id)
        {
            var item = _context.TodoItems.FirstOrDefault(t => t.Id == id);
            if (item == null)
            {
                return null;
            }
            return item;
        }





        /// <summary>
        /// Creates a TodoItem.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Todo
        ///     {
        ///        "id": 1,
        ///        "name": "Item1",
        ///        "isComplete": true
        ///     }
        ///
        /// </remarks>
        /// <param name="item"></param>
        /// <returns>A newly-created TodoItem</returns>
        /// <response code="201">Returns the newly-created item</response>
        /// <response code="400">If the item is null</response>            
        [ProducesResponseType(typeof(TodoItem), 201)]
        [ProducesResponseType(typeof(TodoItem), 400)]
        [HttpPost]
        public IActionResult Create([FromBody] Models.TodoItem item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            _context.TodoItems.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetTodo", new { id = item.Id }, item);
        }




        [HttpPut("{id}")]
        public IActionResult Update(long id, [FromBody] Models.TodoItem item)
        {
            if (item == null || item.Id != id)
            {
                return BadRequest();
            }

            var todo = _context.TodoItems.FirstOrDefault(t => t.Id == id);
            if (todo == null)
            {
                return NotFound();
            }

            todo.IsComplete = item.IsComplete;
            todo.Name = item.Name;
            todo.Details = item.Details;

            _context.TodoItems.Update(todo);
            _context.SaveChanges();
            return new NoContentResult();
        }



        /// <summary>
        /// Deletes a specific TodoItem.
        /// </summary>
        /// <param name="id"></param>     
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var todo = _context.TodoItems.FirstOrDefault(t => t.Id == id);
            if (todo == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todo);
            _context.SaveChanges();
            return new NoContentResult();
        }




    }
}

