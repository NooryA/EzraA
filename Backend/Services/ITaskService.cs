using TaskManagementApi.DTOs;
using TaskManagementApi.Models;

namespace TaskManagementApi.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDTO>> GetAllTasksService();
        Task<TaskDTO> CreateTaskService(CreateTaskDTO createTaskDTO);
        Task<bool?> ToggleTaskStatusService(int id);
        Task<bool> DeleteTaskService(int id);
    }
} 