import { UpdateDuacoderDto } from "../../../../core-services/dtos/request/updateDuacoderRequest.dto";
import { Duacoder } from "../../entities/duacoders.entity";

export interface DuacoderRepositoryInterface {
    getBasicInfoDuacoder(nif: string): Promise<Duacoder>;
    createDuacoder(duacoder: Duacoder): Promise<Duacoder>;
    deleteDuacoder(nif: string): Promise<boolean>;
    updateDuacoder(duacoder: UpdateDuacoderDto): Promise<void>;
    getDuacodersByFilter(page: number, pageSize: number, filter): Promise<Duacoder[]>;
    getDuacodersByFilterNoPaginated(filter): Promise<Duacoder[]>
}