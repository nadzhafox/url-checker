import { DataSource } from 'typeorm';
// docker run --hostname=860e20bad31e
//  --env=POSTGRES_PASSWORD=url-checker 
// --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/lib/postgresql/16/bin 
// --env=GOSU_VERSION=1.16 --env=LANG=en_US.utf8 --env=PG_MAJOR=16 --env=PG_VERSION=16.1-1.pgdg120+1 
// --env=PGDATA=/var/lib/postgresql/data --volume=/var/lib/postgresql/data --network=url-checker_default 
// --restart=always --label='com.docker.compose.config-hash=b3e2d87ffd306c7b6e69d7fadff9f914f1942a87a79eb2adabe328b51237d079'
//  --label='com.docker.compose.container-number=1' --label='com.docker.compose.depends_on=' 
// --label='com.docker.compose.image=sha256:b0b90c1d9579032974dc7a3914392004b29e31c071524575b45ee9985f1c43ba'
//  --label='com.docker.compose.oneoff=False' --label='com.docker.compose.project=url-checker' 
// --label='com.docker.compose.project.config_files=/home/projects/url-checker/docker-compose.yaml' 
// --label='com.docker.compose.project.working_dir=/home/projects/url-checker' --label='com.docker.compose.service=db' 
// --label='com.docker.compose.version=2.23.3' --label='desktop.docker.io/wsl-distro=ubuntu' 
// --runtime=runc -d postgres
export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                // todo env
                host: 'localhost',
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