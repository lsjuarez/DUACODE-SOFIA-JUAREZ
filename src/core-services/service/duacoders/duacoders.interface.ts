import { CreateDuacoderDto } from "../../../core-services/dtos/request/createDuacoderRequest.dto";
import { DeleteDuacoderRequestDto } from "../../../core-services/dtos/request/deleteDuacoderRequest.dto";
import { UpdateDuacoderDto } from "../../../core-services/dtos/request/updateDuacoderRequest.dto";
import { DuacoderInfoDto } from "../../../core-services/dtos/response/duacoderInfoResponse.dto";
import { PuestoDtoResponse } from "../../../core-services/dtos/response/puestoResponse.dto";
import { SkillResponseDto } from "../../../core-services/dtos/response/skillResponse.dto";

export interface DuacoderInterface {
    getDuacoderInfo(nif: string): Promise<DuacoderInfoDto>;
    getPuestos(): Promise<PuestoDtoResponse[]>;
    getSkills(): Promise<SkillResponseDto[]>;
    createSkills(skills: string[]): Promise<void>;
    createDepartamentos(departamentos: string[]): Promise<void>;
    createDuacoder(duacoder: CreateDuacoderDto): Promise<DuacoderInfoDto>;
    deleteDuacoder(duacoder: DeleteDuacoderRequestDto): Promise<boolean>
    updateDuacoder(duacoder: UpdateDuacoderDto): Promise<DuacoderInfoDto>;
    getDuacoders(page: number, pageSize: number, filters): Promise<DuacoderInfoDto[]>;
    uploadDuacoderPhoto(photo, nif:string): Promise<boolean>;
    deleteDuacoderPhoto(nif:string): Promise<boolean>;
    getDuacodersForExcel(filters): Promise<DuacoderInfoDto[]>;
}