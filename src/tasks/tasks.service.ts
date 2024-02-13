import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Url, UrlStatus } from 'src/urls/entities/url.entity';
import { URL_REPOSITORY } from 'src/urls/url.consts';
import { IsNull, LessThan, LessThanOrEqual, Or, Repository } from 'typeorm';
import { isURL } from 'class-validator';
import axios, { AxiosError } from 'axios';

const TRY_COUNTER_LIMIT = 3;
// 3 min
const RETRY_INTERVAL = 3 * 60 * 1000;

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);
    constructor(
        @Inject(URL_REPOSITORY)
        private urlRepository: Repository<Url>,
    ) { }

    @Cron('*/2 * * * *')
    // @Cron('*/30 * * * * *')
    async handleCron() {
        const urls = await this.urlRepository.find({
            where: {
                status: UrlStatus.NEW,
                retryDate: Or(LessThan(new Date()), IsNull()),
                tryCounter: LessThanOrEqual(TRY_COUNTER_LIMIT)
            }
        })

        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            if (isURL(url.name)) {
                try {
                    url.tryCounter += 1;
                    await axios(url.name)
                    url.status = UrlStatus.CHECK
                } catch (error) {
                    if (error instanceof AxiosError) {
                        // если сайт в статусе 503 и кол-во попыток не превышено
                        // вычисляем след. дату обращения
                        if (error?.status === 503) {
                            let retryAfter = error?.response?.headers['retry-after'];
                            // либо дефолтный интервал либо значение которое было в ответе
                            url.retryDate = new Date(
                                Date.now() + retryAfter ?
                                    retryAfter * 1000 :
                                    Date.now() + RETRY_INTERVAL
                            );
                        } else {
                            url.status = UrlStatus.FAIL
                        }
                    } else {
                        throw new Error(error);
                    }
                }
            } else {
                url.status = UrlStatus.FAIL
            }
        }
        await this.urlRepository.save(urls);
        this.logger.log(`Checked ${urls.length} urls`);
    }
}