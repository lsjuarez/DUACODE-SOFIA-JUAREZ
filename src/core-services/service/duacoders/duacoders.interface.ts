import { CreateDuacoderDto } from "src/core-services/dtos/request/createDuacoderRequest.dto";
import { DeleteDuacoderRequestDto } from "src/core-services/dtos/request/deleteDuacoderRequest.dto";
import { UpdateDuacoderDto } from "src/core-services/dtos/request/updateDuacoderRequest.dto";
import { DuacoderInfoDto } from "src/core-services/dtos/response/duacoderInfoResponse.dto";
import { PuestoDtoResponse } from "src/core-services/dtos/response/puestoResponse.dto";
import { SkillResponseDto } from "src/core-services/dtos/response/skillResponse.dto";

export interface DuacoderInterface {
    getDuacoderInfo(nif: string): Promise<DuacoderInfoDto>;
    getPuestos(): Promise<PuestoDtoResponse[]>;
    getSkills(): Promise<SkillResponseDto[]>;
    createDuacoder(duacoder: CreateDuacoderDto): Promise<DuacoderInfoDto>;
    deleteDuacoder(duacoder: DeleteDuacoderRequestDto): Promise<boolean>
    updateDuacoder(duacoder: UpdateDuacoderDto): Promise<DuacoderInfoDto>;
    getDuacoders(page: number, pageSize: number, filters): Promise<DuacoderInfoDto[]>;
}