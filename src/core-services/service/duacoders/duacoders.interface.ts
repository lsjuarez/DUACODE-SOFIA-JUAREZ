import { DuacoderInfoDto } from "src/core-services/dtos/response/duacoderInfoResponse.dto";

export interface DuacoderInterface {
    getDuacoderInfo(nif: string): Promise<DuacoderInfoDto>;
}