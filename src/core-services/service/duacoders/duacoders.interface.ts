import { CreateDuacoderDto } from "src/core-services/dtos/request/createDuacoderRequest.dto";
import { DuacoderInfoDto } from "src/core-services/dtos/response/duacoderInfoResponse.dto";
import { PuestoDtoResponse } from "src/core-services/dtos/response/puestoResponse.dto";
import { SkillResponseDto } from "src/core-services/dtos/response/skillResponse.dto";

export interface DuacoderInterface {
    getDuacoderInfo(nif: string): Promise<DuacoderInfoDto>;
    getPuestos(): Promise<PuestoDtoResponse[]>;
    getSkills(): Promise<SkillResponseDto[]>;
    createDuacoder(duacoder: CreateDuacoderDto): Promise<DuacoderInfoDto>;
}