import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { DbModule } from 'src/db/db.module';
import { urlProviders } from 'src/urls/url.providers';

@Module({
  providers: [...urlProviders, TasksService],
  imports: [DbModule],
})
export class TasksModule { }
