import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { TypeOrmExModule } from "../database/typeorm-ex.module";
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [TypeOrmExModule.forCustomRepository([TaskRepository]),AuthModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule { }
