import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Puesto } from "./puesto.entity";

@Entity({ name: 'duacoders' })
export class Duacoder extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 255, nullable: false })
    nif: string;

    @Column({ name: 'puesto_id', type: 'int', nullable: false })
    puestoId: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    nombre: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    biografia: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    foto: string;

    @Column({ name: 'tortilla_con_cebolla', type: 'boolean', nullable: false })
    tortillaConCebolla: boolean;

    @Column({ name: 'fecha_nacimiento', type: 'date', nullable: false })
    fechaNacimiento: Date;

    constructor() {
        super();
    }
}