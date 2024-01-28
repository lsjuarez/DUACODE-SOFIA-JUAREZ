import { UpdateDuacoderDto } from "src/core-services/dtos/request/updateDuacoderRequest.dto";
import { Duacoder } from "../../entities/duacoders.entity";

export interface DuacoderRepositoryInterface {
    getBasicInfoDuacoder(nif: string): Promise<Duacoder>;
    createDuacoder(duacoder: Duacoder): Promise<Duacoder>;
    deleteDuacoder(nif: string): Promise<boolean>;
    updateDuacoder(duacoder: UpdateDuacoderDto): Promise<void>;
    getDuacodersByFilter(page: number, pageSize: number, filter): Promise<Duacoder[]>;
    uploadDuacoderPhoto(photo, nif:string): Promise<boolean>;
}