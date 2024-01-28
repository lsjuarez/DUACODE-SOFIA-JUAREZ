import { DuacoderInfoDto } from "src/core-services/dtos/response/duacoderInfoResponse.dto";
import { DuacoderInterface } from "./duacoders.interface";
import { Inject } from "@nestjs/common";
import { DepartamentoRepositoryInterface } from "src/providers/duacoders-repo/repositories/departamentos/departamento.repository.interface";
import { PuestoRepositoryInterface } from "src/providers/duacoders-repo/repositories/puesto/puesto.repository.interface";
import { SkillsDuacodersRepositoryInterface } from "src/providers/duacoders-repo/repositories/skillsXduacoders/skillsXduacoders.interface";
import { DuacoderRepositoryInterface } from "src/providers/duacoders-repo/repositories/duadocer/duacoder.interface";

export class DuacodersServiceImpl implements DuacoderInterface {
    constructor(
        @Inject('DepartamentoRepositoryInterface')
        private departamentoRepository: DepartamentoRepositoryInterface,
        @Inject('PuestoRepositoryInterface')
        private puestoRepository: PuestoRepositoryInterface,
        @Inject('SkillsDuacodersRepositoryInterface')
        private skillsXduacoderRepository: SkillsDuacodersRepositoryInterface,
        @Inject('DuacoderRepositoryInterface')
        private duacoderRepository: DuacoderRepositoryInterface
    ){};

    async getDuacoderInfo(nif: string): Promise<DuacoderInfoDto> {
        const duacoder = await this.duacoderRepository.getBasicInfoDuacoder(nif);
        const skills = await this.skillsXduacoderRepository.getSkillsDuacoder(nif);
        const puesto = await this.puestoRepository.getPuesto(duacoder.puestoId);
        const departamento = await this.departamentoRepository.getDepartamentos(puesto.departamentoId);

        const duacoderInfo = {
            nif: nif,
            nombre: duacoder.nombre,
            nombre_departamento: departamento.nombre,
            nombre_puesto: puesto.nombre,
            biografia: duacoder.biografia,
            foto: duacoder.foto,
            tortilla_con_cebolla: duacoder.tortillaConCebolla,
            fecha_nacimiento: duacoder.fechaNacimiento,
            skills: skills
        } as unknown as DuacoderInfoDto;

        return duacoderInfo;
    }
    
}