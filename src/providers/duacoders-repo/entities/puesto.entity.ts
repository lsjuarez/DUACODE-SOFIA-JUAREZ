import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'puesto' })
export class Puesto extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    nombre: string;

    @Column({ name: 'departamento_id', type: 'int', nullable: false })
    departamentoId: number;

    constructor() {
        super();
    }
}