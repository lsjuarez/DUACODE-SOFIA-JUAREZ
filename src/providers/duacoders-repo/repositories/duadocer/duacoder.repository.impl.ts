import { BadRequestException, Injectable } from "@nestjs/common";
import { DuacoderRepositoryInterface } from "./duacoder.interface";
import { Duacoder } from "../../entities/duacoders.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class DuacoderInfoRepository implements DuacoderRepositoryInterface {
    constructor(
        @InjectRepository(Duacoder)
        private duacoderRepository: Repository<Duacoder>,
    ){}
    
    async getBasicInfoDuacoder(nif: string): Promise<Duacoder> {
        const response = await this.duacoderRepository
            .createQueryBuilder()
            .select()
            .where('nif = :nif', { nif })
            .execute();
        
        if(!response.length) throw new BadRequestException('El NIF no corresponde con ningun duacoder.')

        const duacoder = {
            puestoId: response[0].Duacoder_puesto_id,
            nombre: response[0].Duacoder_nombre,
            biografia: response[0].Duacoder_biografia,
            foto: response[0].Duacoder_foto,
            tortillaConCebolla: response[0].Duacoder_tortilla_con_cebolla === 1 ? true : false,
            fechaNacimiento: response[0].Duacoder_fecha_nacimiento
        } as Duacoder;
        return duacoder;
    
    }
;
}