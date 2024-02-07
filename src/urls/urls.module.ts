import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { DbModule } from 'src/db/db.module';
import { urlProviders } from './url.providers';

@Module({
  imports: [DbModule],
  controllers: [UrlsController],
  providers: [...urlProviders, UrlsService],
})
export class UrlsModule { }
