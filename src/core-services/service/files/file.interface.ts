import { DuacoderInfoDto } from "../../../core-services/dtos/response/duacoderInfoResponse.dto";

export interface FileInterface {
    generatePdf(duacoder: DuacoderInfoDto): Promise<Buffer>;
    generateExcel(duacoder: DuacoderInfoDto[]): Promise<Buffer>;
}