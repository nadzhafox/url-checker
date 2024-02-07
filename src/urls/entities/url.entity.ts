import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UrlStatus {
    NEW = "new",
    CHECK = "check",
    FAIL = "fail",
}

@Entity()
export class Url {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500, nullable: false, unique: true })
    name: string;

    @Column({
        type: "enum",
        enum: UrlStatus,
        default: UrlStatus.NEW,
    })
    status: UrlStatus;
}