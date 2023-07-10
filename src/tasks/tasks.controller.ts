import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './DTO/create-task.dto';
import { updateTaskDto } from './DTO/update-task.dto';
import { filterTask } from './DTO/filter-task.dto';
import { updateValidationPipe } from './pipe/status.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/auth.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
export class TasksController {
    private logger = new Logger('task-controller');
    constructor(private TaskService: TasksService) { }
    @Get()
    @UseGuards(AuthGuard())
    getTasks(@Query(ValidationPipe) filterTask: filterTask, @GetUser() user: User) {
        this.logger.verbose(`${user.username} get all task with filer ${JSON.stringify(filterTask)}`)
        return this.TaskService.getTasks(filterTask, user);
    }
    @Get(':id')
    @UseGuards(AuthGuard())
    getTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
        return this.TaskService.getTaskByid(id, user);
    }
    @Post()
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    addNewTask(@Body() body: createTaskDto, @GetUser() user: User) {
        this.logger.verbose(`${user.username} add new task with data ${JSON.stringify(body)}`)
        return this.TaskService.createTask(body, user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    deleteTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
        this.logger.verbose(`${user.username} delete task with id ${id}`)
        return this.TaskService.deleteTask(id, user);
    }
    @Patch(':id')
    @UseGuards(AuthGuard())
    updateTaskById(@Param('id', ParseIntPipe) id: number, @Body(updateValidationPipe) body: updateTaskDto, @GetUser() user: User) {
        this.logger.verbose(`${user.username} updaete task with id ${id} and data ${JSON.stringify(body)}`)
        return this.TaskService.updateTask(id, body, user);
    }
}
