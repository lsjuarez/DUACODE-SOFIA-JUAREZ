import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'skillsxduacoder' })
export class SkillsXDuacoder extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'duacoder_id', type: 'varchar', length: 255, nullable: false })
    duacoderId: string;

    @Column({ name: 'skills_id', type: 'int', nullable: false })
    skillsId: number;

    constructor() {
        super();
    }
}