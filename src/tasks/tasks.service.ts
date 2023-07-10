import { Injectable } from '@nestjs/common';
import { createTaskDto } from './DTO/create-task.dto';
import { updateTaskDto } from './DTO/update-task.dto';
import { filterTask } from './DTO/filter-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private readonly taskRepository: TaskRepository) { }

    async getTasks(filterTask: filterTask, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterTask, user);
    }

    async getTaskByid(id: number, user: User) {
        return this.taskRepository.getTaskByid(id, user);
    }
    createTask(data: createTaskDto, user: User) {
        return this.taskRepository.createTask(data, user);
    }
    async deleteTask(id: number, user: User) {
        return this.taskRepository.deleteTask(id, user);
    }
    async updateTask(id: number, data: updateTaskDto, user: User) {
        const tasku = await this.getTaskByid(id, user);
        tasku.description = (data.description || tasku.description);
        tasku.title = (data.title || tasku.title);
        tasku.status = (data.status || tasku.status);
        tasku.save();
        return tasku;
    }
    /*  getTasks(filterTask: filterTask):  {
          const { status, search } = filterTask;
          let taskS = this.task;
          if (status) {
              taskS = this.task.filter(task => task.status === status);
          }
          if (search) {
              taskS = this.task.filter(task => task.title.includes(search) || task.description.includes(search));
  
          }
          return taskS;
      }
      getTaskByid(id: string): Task {
          const found = this.task.find((val) => val.id === id);
          if (!found) {
              throw new NotFoundException(`task with ${id} not found`);
          }
          return found;
      }
      createTask(data: createTaskDto): Task {
          const newTask: Task = {
              id: uuid(),
              title: data.title,
              description: data.description,
              status: TaskStatus.open,
          };
          this.task.push(newTask);
          return newTask;
      }
      deleteTask(id: string): void {
          const len = this.task.length;
          this.task = this.task.filter((val) => val.id !== id);
          if (this.task.length === len) {
              throw new NotFoundException(`task with ${id} not found`);
          }
      }
      updateTask(id: string, data: updateTaskDto) {
          /* const index = this.task.findIndex((val) => val.id === id);
           this.task[index] = { ...this.task[index], ...data };*/
    /*   const tasku = this.getTaskByid(id);
       if (data.status) {
           tasku.status = data.status;
       }
       if (data.title) {
           tasku.title = data.title;
       } if (data.description) {
           tasku.description = data.description;
       }
       // return this.task[index];
       return tasku;
   }*/
}
