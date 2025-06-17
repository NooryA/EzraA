import React, { useState, useEffect, useCallback } from "react";
import { TaskDTO } from "../../DTO/TaskDTO";
import { getAllTasks } from "@/axios/taskHelper";
import TaskForm from "@/components/TaskForm/TaskForm";
import TaskList from "@/components/TaskList/TaskList";
import styles from "@/pages/index.module.css";
import { toast } from "sonner";

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [isFetchingTasks, setIsFetchingTasks] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const loadTasks = async () => {
    try {
      setIsFetchingTasks(true);
      setError(false);
      const tasksData = await getAllTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error("Error loading tasks:", error);
      toast.error("Failed to load tasks. Please check if the backend server is running.");
      setError(true);
    } finally {
      setIsFetchingTasks(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleRetry = () => {
    loadTasks();
  };

  const handleTaskCreated = useCallback((newTask: TaskDTO) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  }, []);

  const handleTaskUpdated = useCallback((updatedTask: TaskDTO) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  }, []);

  const handleTaskDeleted = useCallback((taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  return (
    <>
      <div className={styles.appContainer}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1>Task Management</h1>
          </header>

          {error && (
            <div className={styles.errorContainer}>
              <button className={styles.retryButton} onClick={handleRetry}>
                Retry
              </button>
            </div>
          )}

          <TaskForm onTaskCreated={handleTaskCreated} />

          <TaskList
            tasks={tasks}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleTaskDeleted}
            isLoading={isFetchingTasks}
            hasError={error}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
