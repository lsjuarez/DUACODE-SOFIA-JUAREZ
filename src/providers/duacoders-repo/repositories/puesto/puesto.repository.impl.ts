import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Puesto } from "../../entities/puesto.entity";
import { Repository } from "typeorm";
import { PuestoRepositoryInterface } from "./puesto.repository.interface";
import { PuestoDtoResponse } from "src/core-services/dtos/response/puestoResponse.dto";

@Injectable()
export class PuestoRepository implements PuestoRepositoryInterface {
    constructor(
        @InjectRepository(Puesto)
        private puestoRepository: Repository<Puesto>
    ){}
    
    async getPuesto(id: number): Promise<Puesto> {
        const response = await this.puestoRepository
            .createQueryBuilder()
            .select()
            .where('id = :id', { id })
            .execute();

        if(!response.length) throw new BadRequestException('El ID no corresponde con ningun puesto.')

        const puesto = {
            id: id,
            nombre: response[0].Puesto_nombre,
            departamentoId: response[0].Puesto_departamento_id
        } as Puesto;

        return puesto;

    }

    async getPuestos(): Promise<PuestoDtoResponse[]> {
        const response = await this.puestoRepository
            .createQueryBuilder()
            .select()
            .execute()

        if(!response.length) throw new BadRequestException('No se encontraron puestos de trabajo.')
        
        let puestos: PuestoDtoResponse[] = [];
        for(let puesto of response){
            let pto = {
                puesto_id: puesto.Puesto_id,
                nombre: puesto.Puesto_nombre
            } as PuestoDtoResponse;
            puestos.push(pto);
        }

        return puestos;

    }
    
}