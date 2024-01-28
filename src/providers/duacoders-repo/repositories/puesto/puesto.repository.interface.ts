import { PuestoDtoResponse } from "../../../../core-services/dtos/response/puestoResponse.dto";
import { Puesto } from "../../entities/puesto.entity";

export interface PuestoRepositoryInterface {
    getPuestos(): Promise<PuestoDtoResponse[]>;
    getPuesto(id: number): Promise<Puesto>;
}