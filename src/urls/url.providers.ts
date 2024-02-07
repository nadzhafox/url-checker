import { DataSource } from 'typeorm';
import { Url } from './entities/url.entity';
import { URL_REPOSITORY } from './url.consts';


export const urlProviders = [
    {
        provide: URL_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Url),
        inject: ['DATA_SOURCE'],
    },
];