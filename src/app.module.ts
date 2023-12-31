import { Module } from '@nestjs/common';
//import { userModule } from './user/user.module';

import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig), TasksModule, AuthModule],
    controllers: []
})
export class AppModule { }
