import { DuacoderInfoDto } from "src/core-services/dtos/response/duacoderInfoResponse.dto";
import { DuacoderInterface } from "./duacoders.interface";
import { Inject } from "@nestjs/common";
import { DepartamentoRepositoryInterface } from "src/providers/duacoders-repo/repositories/departamentos/departamento.repository.interface";

export class DuacodersServiceImpl implements DuacoderInterface {
    constructor(
        @Inject('DepartamentoRepositoryInterface')
        private departamentoRepository: DepartamentoRepositoryInterface,
    ){};

    async getDuacoderInfo(nif: string): Promise<DuacoderInfoDto> {
        const getDepartamento = await this.departamentoRepository.getDepartamentos(1);
        return null;
    }
    
}