import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DepartamentoRepositoryInterface } from "./departamento.repository.interface";
import { Departamento } from "../../entities/departamentos.entity";

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

    async createDepartamentos(departamentos: string[]): Promise<void> {
        const deparamentosObject = departamentos.map(departamentoName => ({ nombre: departamentoName }));
        await this.departamentoRepository
            .createQueryBuilder()
            .insert()
            .values(deparamentosObject)
            .execute()
    }
    
}