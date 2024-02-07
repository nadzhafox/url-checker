import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Url, UrlStatus } from 'src/urls/entities/url.entity';
import { URL_REPOSITORY } from 'src/urls/url.consts';
import { Repository } from 'typeorm';
import { isURL } from 'class-validator';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);
    constructor(
        @Inject(URL_REPOSITORY)
        private urlRepository: Repository<Url>,
    ) { }

    // @Cron('*/2 * * * *')
    @Cron('30 * * * * *')
    async handleCron() {
        const urls = await this.urlRepository.find({ where: { status: UrlStatus.NEW } })
        urls.forEach(url => {
            url.status = isURL(url.name) ? UrlStatus.CHECK : UrlStatus.FAIL
        });
        this.urlRepository.save(urls);
        this.logger.debug(`Checked ${urls.length} urls`);
    }
}