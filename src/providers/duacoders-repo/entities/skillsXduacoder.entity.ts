import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Duacoder } from "./duacoders.entity";
import { Skill } from "./skills.entity";

@Entity({ name: 'skillsxduacoder' })
export class SkillsXDuacoder extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'duacoder_id', type: 'varchar', length: 255, nullable: false })
    duacoderId: string;

    @Column({ name: 'skills_id', type: 'int', nullable: false })
    skillsId: number;

    @ManyToMany(() => Duacoder, duacoder => duacoder.nif)
    @JoinColumn({ name: 'duacoder_id' })
    duacoder: Duacoder;

    @ManyToMany(() => Skill, skill => skill.id)
    @JoinColumn({ name: 'skills_id' })
    skill: Skill;

    constructor() {
        super();
    }
}