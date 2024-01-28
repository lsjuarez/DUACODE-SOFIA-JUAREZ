import { BadRequestException, Injectable } from "@nestjs/common";
import { DepartamentoRepositoryInterface } from "./departamento.repository.interface";
import { Departamento } from "../../entities/departamentos.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class DepartamentoRepository implements DepartamentoRepositoryInterface {
    constructor(
        @InjectRepository(Departamento)
        private departamentoRepository: Repository<Departamento>,
    ){}

    async getDepartamentos(id: number): Promise<Departamento> {
        const response =  await this.departamentoRepository
        .createQueryBuilder()
        .select(['nombre'])
        .where('id = :id', { id })
        .execute();

        if(!response.length) throw new BadRequestException('El ID no corresponde con ningun departamento.')

        const departamento = {
            id: id,
            nombre: response[0].nombre
        } as Departamento;

        return departamento;
    }
    
}