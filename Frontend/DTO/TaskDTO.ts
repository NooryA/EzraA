import { CreateTaskDTO } from "./CreateTaskDTO";

export interface TaskDTO extends CreateTaskDTO {
  id: number;
  createdAt: string;
  isCompleted: boolean;
}
