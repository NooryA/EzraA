import React, { KeyboardEvent, useCallback, useState } from "react";
import { TaskDTO } from "../../../DTO/TaskDTO";
import { toggleTaskStatus, deleteTask } from "@/axios/taskHelper";
import { toast } from "sonner";
import Modal from "../Modal/Modal";
import styles from "./TaskItem.module.css";

interface TaskItemProps {
  task: TaskDTO;
  onTaskUpdated: (updatedTask: TaskDTO) => void;
  onTaskDeleted: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    if (isToggling) return;
    try {
      setIsToggling(true);
      await toggleTaskStatus(task.id);
      onTaskUpdated({ ...task, isCompleted: !task.isCompleted });
    } catch (error) {
      console.error("Error toggling task:", error);
      toast.error("Failed to update task status. Please try again.");
    } finally {
      setIsToggling(false);
    }
  };

  const handleDeleteClick = useCallback(() => {
    setShowDeleteModal(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      setIsDeleting(true);
      await deleteTask(task.id);
      setShowDeleteModal(false);
      onTaskDeleted(task.id);
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }, [task.id, onTaskDeleted]);

  const handleDeleteCancel = useCallback(() => {
    setShowDeleteModal(false);
  }, []);

  return (
    <div className={`${styles.taskItem} ${task.isCompleted ? styles.completed : styles.pending}`}>
      <div className={styles.taskHeader}>
        <div
          className={`${styles.taskCheckbox} ${isToggling ? styles.toggling : task.isCompleted ? styles.checked : styles.unchecked}`}
          onClick={handleToggle}
          role="button"
          tabIndex={0}
          aria-label={task.isCompleted ? "Mark as incomplete" : "Mark as complete"}
        />

        <div className={styles.taskContent} onClick={handleToggle}>
          <h3 className={`${styles.taskTitle} ${task.isCompleted ? styles.completed : styles.pending}`}>{task.title}</h3>

          {task.description && (
            <p className={`${styles.taskDescription} ${task.isCompleted ? styles.completed : styles.pending}`}>{task.description}</p>
          )}
        </div>
      </div>

      <div className={styles.taskMeta}>
        <div className={styles.taskDates}>
          <span className={styles.taskDate}>Created: {task.createdAt}</span>
          {task.updatedAt !== task.createdAt && <span className={styles.taskDate}>Updated: {task.updatedAt}</span>}
        </div>

        <button className={styles.deleteButton} onClick={handleDeleteClick} aria-label={`Delete task: ${task.title}`}>
          Delete
        </button>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        subtitle="This action cannot be undone"
        confirmText={isDeleting ? "Deleting..." : "Delete Task"}
        cancelText="Cancel"
        isConfirmLoading={isDeleting}
        confirmButtonType="danger"
        closeOnBackdropClick={!isDeleting}
      >
        <p style={{ margin: 0, color: "#374151", lineHeight: "1.5" }}>
          Are you sure you want to delete the task <strong style={{ color: "#1f2937" }}>"{task.title}"</strong>?
        </p>
      </Modal>
    </div>
  );
};

export default React.memo(TaskItem);
