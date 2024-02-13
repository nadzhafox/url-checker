import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';

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
    @IsString()
    @IsNotEmpty()
    name: string;

    @Column({
        type: "enum",
        enum: UrlStatus,
        default: UrlStatus.NEW,
    })
    status: UrlStatus;

    @Column({
        type: "timestamptz",
        nullable: true,
    })
    retryDate: Date;

    @Column({
        default: 0
    })
    tryCounter: number;
}