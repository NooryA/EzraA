using Microsoft.AspNetCore.Mvc;
using TaskManagementApi.DTOs;
using TaskManagementApi.Services;

namespace TaskManagementApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDTO>>> GetTasks()
        {
            try
            {
                var tasks = await _taskService.GetAllTasksService();
                return Ok(tasks);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "An error occurred while retrieving tasks." });
            }
        }

  
        [HttpPost]
        public async Task<ActionResult<TaskDTO>> CreateTask(CreateTaskDTO createTaskDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var task = await _taskService.CreateTaskService(createTaskDTO);
                return Ok(task);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "An error occurred while creating the task." });
            }
        }

 
        [HttpPatch("{id}/toggle")]
        public async Task<IActionResult> ToggleTaskStatus(int id)
        {
            try
            {
                var result = await _taskService.ToggleTaskStatusService(id);
                
                if (result == null)
                {
                    return NotFound(new { error = $"Task with ID {id} not found." });
                }

                return Ok(new { message = "Task status toggled successfully." });
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "An error occurred while updating the task." });
            }
        }

 
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            try
            {
                var success = await _taskService.DeleteTaskService(id);
                
                if (!success)
                {
                    return NotFound(new { error = $"Task with ID {id} not found." });
                }

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "An error occurred while deleting the task." });
            }
        }
    }
} 