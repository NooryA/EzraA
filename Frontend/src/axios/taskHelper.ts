import { CreateTaskDTO } from "../../DTO/CreateTaskDTO";
import api from "./config";
import { TaskDTO } from "../../DTO/TaskDTO";

export const getAllTasks = async (): Promise<TaskDTO[]> => {
  const response = await api.get("/tasks");
  return response.data;
};

export const createTask = async (taskData: CreateTaskDTO): Promise<TaskDTO> => {
  const response = await api.post("/tasks", taskData);
  return response.data;
};

export const toggleTaskStatus = async (id: number): Promise<void> => {
  await api.patch(`/tasks/${id}/toggle`);
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
