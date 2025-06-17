import React, { useState, FormEvent, ChangeEvent } from "react";
import { CreateTaskDTO } from "../../../DTO/CreateTaskDTO";
import { TaskDTO } from "../../../DTO/TaskDTO";
import { createTask } from "@/axios/taskHelper";
import { toast } from "sonner";
import styles from "./TaskForm.module.css";

interface TaskFormProps {
  onTaskCreated: (newTask: TaskDTO) => void;
}

interface FormErrors {
  [key: string]: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState<CreateTaskDTO>({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const trimmedTitle = formData.title.trim();
    const trimmedDescription = formData.description.trim();

    // Validate title
    if (!trimmedTitle) {
      newErrors.title = "Task title is required.";
    } else if (trimmedTitle.length < 3) {
      newErrors.title = "Task title must be at least 3 characters long (excluding spaces).";
    } else if (trimmedTitle.length > 200) {
      newErrors.title = "Task title cannot exceed 200 characters (excluding spaces).";
    }

    // Validate description
    if (!trimmedDescription) {
      newErrors.description = "Task description is required.";
    } else if (trimmedDescription.length < 3) {
      newErrors.description = "Task description must be at least 3 characters long (excluding spaces).";
    } else if (trimmedDescription.length > 1000) {
      newErrors.description = "Task description cannot exceed 1000 characters (excluding spaces).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      const taskData: CreateTaskDTO = {
        title: formData.title.trim(),
        description: formData.description.trim(),
      };

      const newTask = await createTask(taskData);
      onTaskCreated(newTask);
      setFormData({
        title: "",
        description: "",
      });
      setErrors({});

      toast.success("Task created successfully!");
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task. Please try again.");
      setErrors({ general: "Failed to create task. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.taskForm} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Add New Task</h2>

      {errors.general && <div className={styles.errorContainer}>{errors.general}</div>}

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="title">
          Task Title <span className={styles.required}>*</span>
        </label>
        <input
          className={`${styles.input} ${errors.title ? styles.error : styles.normal}`}
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title..."
          disabled={isLoading}
        />
        {errors.title && <div className={styles.errorMessage}>{errors.title}</div>}
        <div className={styles.characterCount}>{formData.title.length}/200 characters</div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="description">
          Description <span className={styles.required}>*</span>
        </label>
        <textarea
          className={`${styles.textarea} ${errors.description ? styles.error : styles.normal}`}
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description..."
          disabled={isLoading}
          rows={3}
        />
        {errors.description && <div className={styles.errorMessage}>{errors.description}</div>}
        <div className={styles.characterCount}>{formData.description.length}/1000 characters</div>
      </div>

      <button className={styles.submitButton} type="submit" disabled={isLoading}>
        {isLoading && <div className={styles.loadingSpinner} />}
        {isLoading ? "Creating..." : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
