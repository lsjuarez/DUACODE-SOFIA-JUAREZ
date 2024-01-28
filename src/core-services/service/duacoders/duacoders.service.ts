import { DuacoderInfoDto } from "src/core-services/dtos/response/duacoderInfoResponse.dto";
import { DuacoderInterface } from "./duacoders.interface";
import { BadRequestException, Inject } from "@nestjs/common";
import { DepartamentoRepositoryInterface } from "src/providers/duacoders-repo/repositories/departamentos/departamento.repository.interface";
import { PuestoRepositoryInterface } from "src/providers/duacoders-repo/repositories/puesto/puesto.repository.interface";
import { SkillsDuacodersRepositoryInterface } from "src/providers/duacoders-repo/repositories/skillsXduacoders/skillsXduacoders.interface";
import { DuacoderRepositoryInterface } from "src/providers/duacoders-repo/repositories/duadocer/duacoder.interface";
import { CreateDuacoderDto } from "src/core-services/dtos/request/createDuacoderRequest.dto";
import { PuestoDtoResponse } from "src/core-services/dtos/response/puestoResponse.dto";
import { SkillResponseDto } from "src/core-services/dtos/response/skillResponse.dto";
import { SkillsRepositoryInterface } from "src/providers/duacoders-repo/repositories/skills/skills.interface";
import { Duacoder } from "src/providers/duacoders-repo/entities/duacoders.entity";
import { DeleteDuacoderRequestDto } from "src/core-services/dtos/request/deleteDuacoderRequest.dto";
import { UpdateDuacoderDto } from "src/core-services/dtos/request/updateDuacoderRequest.dto";

export class DuacodersServiceImpl implements DuacoderInterface {
    constructor(
        @Inject('DepartamentoRepositoryInterface')
        private departamentoRepository: DepartamentoRepositoryInterface,
        @Inject('PuestoRepositoryInterface')
        private puestoRepository: PuestoRepositoryInterface,
        @Inject('SkillsRepositoryInterface')
        private skillsRepository: SkillsRepositoryInterface,
        @Inject('SkillsDuacodersRepositoryInterface')
        private skillsXduacoderRepository: SkillsDuacodersRepositoryInterface,
        @Inject('DuacoderRepositoryInterface')
        private duacoderRepository: DuacoderRepositoryInterface,
    ){}
    
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
    
    async getPuestos(): Promise<PuestoDtoResponse[]> {
        return await this.puestoRepository.getPuestos();
    }
    
    async getSkills(): Promise<SkillResponseDto[]> {
        return await this.skillsRepository.getAllSkills();
    }
    
    async createDuacoder(duacoder: CreateDuacoderDto): Promise<DuacoderInfoDto> {
        const newDuacoder = {
            nif: duacoder.nif,
            puestoId: duacoder.puesto_id,
            nombre: duacoder.nombre,
            biografia: duacoder.biografia ? duacoder.biografia : null,
            foto: null,
            tortillaConCebolla: duacoder.tortillaConCebolla,
            fechaNacimiento: duacoder.fechaNacimiento ? duacoder.fechaNacimiento : null,
        } as unknown as Duacoder;
        
        await this.duacoderRepository.createDuacoder(newDuacoder);
        await this.skillsXduacoderRepository.createSkillsxDuacoder(duacoder.nif, duacoder.skills_id);
        
        return this.getDuacoderInfo(duacoder.nif);
    };

    async deleteDuacoder(duacoder: DeleteDuacoderRequestDto): Promise<boolean> {
        const { nif } = duacoder;
        const deleteSkills = await this.skillsXduacoderRepository.deleteSkillsXduacoder(nif);
        if(deleteSkills) {

            const deleteDuacoder = await this.duacoderRepository.deleteDuacoder(nif);
            if(deleteDuacoder) return true;
            throw new BadRequestException('No se encontró duacoder para borrar.')
        }
        throw new BadRequestException('No se encontró duacoder para borrar.')
    }

    async updateDuacoder(duacoder: UpdateDuacoderDto): Promise<DuacoderInfoDto> {
    
        await this.duacoderRepository.updateDuacoder(duacoder);
        
        return this.getDuacoderInfo(duacoder.nif);
    }

    async getDuacoders(page: number, pageSize: number, filters): Promise<DuacoderInfoDto[]> {
        const duacoders = await this.duacoderRepository.getDuacodersByFilter(page, pageSize, filters);
        
        let duacodersInfo:DuacoderInfoDto[] = [];
        for( let duacoder of duacoders) {
            const skills = await this.skillsXduacoderRepository.getSkillsDuacoder(duacoder.nif);
            const puesto = await this.puestoRepository.getPuesto(duacoder.puestoId);
            const departamento = await this.departamentoRepository.getDepartamentos(puesto.departamentoId);
            
            
            const d = {
                nif: duacoder.nif,
                nombre: duacoder.nombre,
                nombre_departamento: departamento.nombre,
                nombre_puesto: puesto.nombre,
                biografia: duacoder.biografia,
                foto: duacoder.foto,
                tortilla_con_cebolla: duacoder.tortillaConCebolla,
                fecha_nacimiento: duacoder.fechaNacimiento,
                skills: skills
            } as unknown as DuacoderInfoDto;
            duacodersInfo.push(d);
        }

        return duacodersInfo;
    }

    async uploadDuacoderPhoto(photo, nif:string): Promise<boolean> {
        const photoBase64 = photo.buffer.toString('base64');
        return await this.duacoderRepository.uploadDuacoderPhoto(photoBase64, nif);
    }
}