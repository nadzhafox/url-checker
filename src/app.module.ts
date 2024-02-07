import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { UrlsModule } from './urls/urls.module';

@Module({
  imports: [DbModule, UrlsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
