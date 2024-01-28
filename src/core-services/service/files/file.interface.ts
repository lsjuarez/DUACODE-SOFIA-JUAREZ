import { DuacoderInfoDto } from "src/core-services/dtos/response/duacoderInfoResponse.dto";

export interface FileInterface {
    generatePdf(duacoder: DuacoderInfoDto): Promise<Buffer>;
}