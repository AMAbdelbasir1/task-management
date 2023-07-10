import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task-status.enum";
const taskStatus: any[] = ['DONE', 'OPEN', 'PANDING'];
export class filterTask {
    @IsOptional()
    @IsIn(taskStatus)
    status: TaskStatus;
    @IsOptional()
    @IsNotEmpty()
    search: string;
}