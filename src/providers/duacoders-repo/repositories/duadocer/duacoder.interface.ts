import { Duacoder } from "../../entities/duacoders.entity";

export interface DuacoderRepositoryInterface {
    getBasicInfoDuacoder(nif: string): Promise<Duacoder>;
}