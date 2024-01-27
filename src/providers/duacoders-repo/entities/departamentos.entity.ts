import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'departamentos'})
export class Departamento extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    nombre: string;

    constructor() {
        super();
    }
}