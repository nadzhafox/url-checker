import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { UrlsModule } from './urls/urls.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [DbModule, UrlsModule,
    ScheduleModule.forRoot(),
    TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
