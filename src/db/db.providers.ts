import { DataSource } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                // todo env
                host: process.env.NODE_ENV === 'production' ? 'db' : 'localhost',
                port: 5432,
                username: 'url-checker',
                password: 'url-checker',
                database: 'url-checker',
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                // todo Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
                synchronize: true,
            });

            return dataSource.initialize();
        },
    },
];