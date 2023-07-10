import { Repository } from "typeorm";
import { Task } from "./task.entity";
import { CustomRepository } from "../database/typeorm-ex.decorator";
import { createTaskDto } from "./DTO/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { filterTask } from './DTO/filter-task.dto';
import { User } from "src/auth/user.entity";
@CustomRepository(Task)
export class TaskRepository extends Repository<Task>{
    private logger = new Logger('taskmanegment');
    async getTasks(filterTask: filterTask, user: User): Promise<Task[]> {
        const { status, search } = filterTask;
        const query = this.createQueryBuilder('task');
        query.where('task.userId = :userId', { userId: user.id })
        if (status) {
            query.andWhere('task.status = :status', { status })
        }
        if (search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search })

        }
        try {
            const taskRes = await query.getMany();
            return taskRes;
        } catch (error) {
           this. logger.error(`${user.username} get error when get tasks  ${error}`,error.stack);
           throw new InternalServerErrorException();
        }

    }
    async createTask(data: createTaskDto, user: User) {
        const { title, description } = data;
        const newTask = new Task();
        newTask.title = title;
        newTask.description = description;
        newTask.status = TaskStatus.open;
        newTask.user = user;
        
        try {
        await newTask.save();
        delete newTask.user;
        return newTask;
        } catch (error) {
           this. logger.error(`${user.username} get error when create new task msg  ${error}`,error.stack);
           throw new InternalServerErrorException();
        }
    }
    async getTaskByid(id: number, user: User) {
        const found = await this.findOne({ where: { id } });
        if (!found) {
            throw new NotFoundException(`task with id ${id} not found`);
        }
        if (found.userId !== user.id) {
            throw new UnauthorizedException(`can't access to this task`);
        }
        return found;
    }

    async deleteTask(id: number, user: User) {
        const found = await this.findOne({ where: { id } });
        if (!found) {
            throw new NotFoundException(`task with id ${id} not found`);
        }
        if (found.userId !== user.id) {
            throw new UnauthorizedException(`can't access to this task`);
        }
        
        try {
            await this.delete(id);
            } catch (error) {
               this. logger.error(`${user.username} get error when delete task with id:${id} `,error.stack);
               throw new InternalServerErrorException();
            }
    }
}


