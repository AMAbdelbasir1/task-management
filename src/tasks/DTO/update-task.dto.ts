import { TaskStatus } from "../task-status.enum";

export class updateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus
}