import { PuestoDtoResponse } from "src/core-services/dtos/response/puestoResponse.dto";
import { Puesto } from "../../entities/puesto.entity";
import { SkillResponseDto } from "src/core-services/dtos/response/skillResponse.dto";

export interface PuestoRepositoryInterface {
    getPuestos(): Promise<PuestoDtoResponse[]>;
    getPuesto(id: number): Promise<Puesto>;
}