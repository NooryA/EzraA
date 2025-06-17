using Microsoft.EntityFrameworkCore;
using TaskManagementApi.Data;
using TaskManagementApi.DTOs;
using TaskManagementApi.Models;

namespace TaskManagementApi.Services
{
    public class TaskService : ITaskService
    {
        private readonly TaskDbContext _context;

        public TaskService(TaskDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskDTO>> GetAllTasksService()
        {
            var tasks = await _context.Tasks
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            return tasks.Select(t => new TaskDTO
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                IsCompleted = t.IsCompleted,
                CreatedAt = FormatDate(t.CreatedAt)
            });
        }

 

        public async Task<TaskDTO> CreateTaskService(CreateTaskDTO createTaskDTO)
        {
            var task = new TaskModel
            {
                Title = createTaskDTO.Title.Trim(),
                Description = createTaskDTO.Description.Trim(),
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return new TaskDTO
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                IsCompleted = task.IsCompleted,
                CreatedAt = FormatDate(task.CreatedAt)
            };
        }

        public async Task<bool> DeleteTaskService(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            
            if (task == null)
                return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            
            return true;
        }

        public async Task<bool?> ToggleTaskStatusService(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            
            if (task == null)
                return null;

            task.IsCompleted = !task.IsCompleted;

            await _context.SaveChangesAsync();

            return true;
        }

    
        private static string FormatDate(DateTime dateTime)
        {
            // Convert UTC to EST
            var estTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
            var estDateTime = TimeZoneInfo.ConvertTimeFromUtc(dateTime, estTimeZone);
            
            // Format as date and time in EST
            return estDateTime.ToString("MM/dd/yyyy hh:mm tt") + " EST";
        }
    }


} 