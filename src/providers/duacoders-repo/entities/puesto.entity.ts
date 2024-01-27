import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Departamento } from "./departamentos.entity";

@Entity({ name: 'puesto' })
export class Puesto extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    nombre: string;

    @Column({ name: 'departamento_id', type: 'int', nullable: false })
    departamentoId: number;

    @ManyToOne(() => Departamento, departamento => departamento.id)
    @JoinColumn({ name: 'departamento_id' })
    departamento: Departamento;

    constructor() {
        super();
    }
}