import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'photos' })
export class Photo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    duacoder_id: string;

    @Column('longtext')
    photo_string: string;

    constructor() {
        super();
    }
}