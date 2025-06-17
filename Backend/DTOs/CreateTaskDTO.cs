using System.ComponentModel.DataAnnotations;

namespace TaskManagementApi.DTOs
{
    public class CreateTaskDTO
    {
        [Required(ErrorMessage = "Task title is required.")]
        [StringLength(200, ErrorMessage = "Task title cannot exceed 200 characters.")]
        [MinimumTrimmedLength(3, ErrorMessage = "Task title must be at least 3 characters long (excluding spaces).")]
        public string Title { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Task description is required.")]
        [StringLength(1000, ErrorMessage = "Task description cannot exceed 1000 characters.")]
        [MinimumTrimmedLength(3, ErrorMessage = "Task description must be at least 3 characters long (excluding spaces).")]
        public string Description { get; set; } = string.Empty;
    }

    public class MinimumTrimmedLengthAttribute : ValidationAttribute
    {
        private readonly int _minimumLength;

        public MinimumTrimmedLengthAttribute(int minimumLength)
        {
            _minimumLength = minimumLength;
        }

        public override bool IsValid(object? value)
        {
            if (value is string stringValue)
            {
                return stringValue.Trim().Length >= _minimumLength;
            }
            return false;
        }
    }
} 