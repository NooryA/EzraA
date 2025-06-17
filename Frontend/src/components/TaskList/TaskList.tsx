import React, { useState, useMemo, ChangeEvent } from "react";
import { TaskDTO } from "../../../DTO/TaskDTO";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./TaskList.module.css";

interface TaskListProps {
  tasks: TaskDTO[];
  onTaskUpdated: (updatedTask: TaskDTO) => void;
  onTaskDeleted: (taskId: number) => void;
  isLoading: boolean;
  hasError: boolean;
}
interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  completionPercentage: number;
}

type FilterType = "all" | "completed" | "pending";
type SortType = "newest" | "oldest";

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskUpdated, onTaskDeleted, isLoading, hasError }) => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortType>("newest");

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = [...tasks];

    switch (filter) {
      case "completed":
        filtered = filtered.filter((task) => task.isCompleted);
        break;
      case "pending":
        filtered = filtered.filter((task) => !task.isCompleted);
        break;
      default:
        break;
    }

    switch (sortBy) {
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;

      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [tasks, filter, sortBy]);

  const taskStats = useMemo((): TaskStats => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.isCompleted).length;
    const pending = total - completed;
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, completionPercentage };
  }, [tasks]);

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as FilterType);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortType);
  };

  if (isLoading && tasks.length === 0) {
    return (
      <div className={styles.taskList}>
        <div className={styles.loadingContainer}>
          <p>Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.taskList}>
      <div className={styles.statsContainer}>
        <h3>Task Overview</h3>
        <div className={styles.statsGrid}>
          <div className={`${styles.statItem} ${styles.total}`}>
            <strong>{taskStats.total}</strong>
            <span>Total</span>
          </div>
          <div className={`${styles.statItem} ${styles.completed}`}>
            <strong>{taskStats.completed}</strong>
            <span>Completed</span>
          </div>
          <div className={`${styles.statItem} ${styles.pending}`}>
            <strong>{taskStats.pending}</strong>
            <span>Pending</span>
          </div>
          <div className={`${styles.statItem} ${styles.percentage}`}>
            <strong>{taskStats.completionPercentage}%</strong>
            <span>Complete</span>
          </div>
        </div>
      </div>

      {tasks.length > 0 && (
        <div className={styles.taskControls}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Filter:</label>
            <select className={styles.select} value={filter} onChange={handleFilterChange}>
              <option value="all">All Tasks ({taskStats.total})</option>
              <option value="pending">Pending ({taskStats.pending})</option>
              <option value="completed">Completed ({taskStats.completed})</option>
            </select>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.label}>Sort by:</label>
            <select className={styles.select} value={sortBy} onChange={handleSortChange}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      )}

      {filteredAndSortedTasks.length === 0 ? (
        <div className={styles.emptyState}>
          {tasks.length === 0 ? (
            <>
              {hasError ? (
                <>
                  <h3>Unable to load tasks</h3>
                  <p>There was a problem connecting to the server. Please try again.</p>
                </>
              ) : (
                <>
                  <h3>No tasks yet!</h3>
                  <p>Create your first task using the form above.</p>
                </>
              )}
            </>
          ) : (
            <>
              <h3>No {filter} tasks</h3>
              <p>
                {filter === "completed" && "You haven't completed any tasks yet."}
                {filter === "pending" && "Great! You've completed all your tasks."}
              </p>
            </>
          )}
        </div>
      ) : (
        <>
          <div className={styles.taskCount}>
            Showing {filteredAndSortedTasks.length} of {tasks.length} tasks
          </div>

          {filteredAndSortedTasks.map((task) => (
            <TaskItem key={task.id} task={task} onTaskUpdated={onTaskUpdated} onTaskDeleted={onTaskDeleted} />
          ))}
        </>
      )}
    </div>
  );
};

export default TaskList;
