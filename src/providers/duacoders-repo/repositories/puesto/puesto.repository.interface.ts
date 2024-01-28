import { Puesto } from "../../entities/puesto.entity";

export interface PuestoRepositoryInterface {
    getPuesto(id: number): Promise<Puesto>;
}