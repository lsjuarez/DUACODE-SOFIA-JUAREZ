import { Departamento } from "../../entities/departamentos.entity";

export interface DepartamentoRepositoryInterface {
    getDepartamentos(id: number): Promise<Departamento>;
    createDepartamentos(departamentos: string[]): Promise<void>;
}