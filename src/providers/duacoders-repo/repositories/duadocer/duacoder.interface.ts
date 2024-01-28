import { Duacoder } from "../../entities/duacoders.entity";

export interface DuacoderRepositoryInterface {
    getBasicInfoDuacoder(nif: string): Promise<Duacoder>;
    createDuacoder(duacoder: Duacoder): Promise<Duacoder>;
    deleteDuacoder(nif: string): Promise<boolean>;
}