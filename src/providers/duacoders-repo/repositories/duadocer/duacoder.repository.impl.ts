import { BadRequestException, Injectable } from "@nestjs/common";
import { DuacoderRepositoryInterface } from "./duacoder.interface";
import { Duacoder } from "../../entities/duacoders.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateDuacoderDto } from "src/core-services/dtos/request/updateDuacoderRequest.dto";
import { SkillsXDuacoder } from "../../entities/skillsXduacoder.entity";
import { Skill } from "../../entities/skills.entity";

@Injectable()
export class DuacoderInfoRepository implements DuacoderRepositoryInterface {
    constructor(
        @InjectRepository(Duacoder)
        private duacoderRepository: Repository<Duacoder>,
    ) { }

    async getBasicInfoDuacoder(nif: string): Promise<Duacoder> {
        const response = await this.duacoderRepository
            .createQueryBuilder()
            .select()
            .where('nif = :nif', { nif })
            .execute();

        if (!response.length) throw new BadRequestException('El NIF no corresponde con ningun duacoder.')

        const duacoder = {
            puestoId: response[0].Duacoder_puesto_id,
            nombre: response[0].Duacoder_nombre,
            biografia: response[0].Duacoder_biografia,
            foto: response[0].Duacoder_foto,
            tortillaConCebolla: response[0].Duacoder_tortilla_con_cebolla === 1 ? true : false,
            fechaNacimiento: response[0].Duacoder_fecha_nacimiento
        } as Duacoder;
        return duacoder;

    };

    async createDuacoder(duacoder: Duacoder): Promise<Duacoder> {
        return await this.duacoderRepository.save(duacoder);
    }

    async deleteDuacoder(nif: string): Promise<boolean> {
        const response = await this.duacoderRepository
            .createQueryBuilder()
            .delete()
            .where('nif = :nif', { nif })
            .execute()

        if (response.affected === 0) return false;
        return true;
    }

    async updateDuacoder(duacoder: UpdateDuacoderDto): Promise<void> {
        const { nif } = duacoder;
        await this.duacoderRepository
            .createQueryBuilder()
            .update()
            .set(duacoder)
            .where('nif = :nif', { nif })
            .execute()
    }

    async getDuacodersByFilter(page: number, pageSize: number, filter): Promise<Duacoder[]> {
        try {
            const queryBuilder = this.duacoderRepository.createQueryBuilder('d')
                .select([
                    'd.nif AS "nif"',
                    'd.puesto_id AS "puestoId"',
                    'd.nombre AS "nombre"',
                    'd.biografia AS "biografia"',
                    'd.foto AS "foto"',
                    'd.tortilla_con_cebolla AS "tortillaConCebolla"',
                    'd.fecha_nacimiento AS "fechaNacimiento"'
                ])
                .distinct(true)
                .innerJoin(SkillsXDuacoder, 'sxd', 'sxd.duacoder_id = d.nif')
                .innerJoin(Skill, 's', 's.id = sxd.skills_id')

            if (filter.puesto_id) {
                const { puesto_id } = filter;
                queryBuilder.andWhere('d.puesto_id = :puesto_id', { puesto_id });
            }

            if (filter.skill_id) {
                const { skill_id } = filter;
                queryBuilder.andWhere('s.id = :skill_id', { skill_id });
            }

            const duacoders = await queryBuilder
                .skip((page - 1) * pageSize)
                .take(pageSize)
                .execute();

            return duacoders;
        } catch (err) {
            throw new BadRequestException(err)
        }
    }

    async uploadDuacoderPhoto(photo:string, nif:string): Promise<boolean> {
        const photoDB = await this.duacoderRepository.update(nif, { foto: photo });
        if(photoDB.affected === 0) return false;
        return true;
    }
}