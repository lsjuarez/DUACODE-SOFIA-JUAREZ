import { Controller, Post, UseGuards,  Get, Query, BadRequestException, Inject, Body, Delete, UseInterceptors, UploadedFile, Res } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from 'express';
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import * as path from 'path';
import { DuacoderInterface } from "../../core-services/service/duacoders/duacoders.interface";
import { FileInterface } from "../../core-services/service/files/file.interface";
import { AuthGuard } from "../../core-services/service/auth/jwt-auth.guard";
import { DeleteDuacoderPhotoReqDto } from "../../core-services/dtos/request/deleteDuacoderPhotoRequest.dto";
import { LOG_FILE_PATH } from "../../core-services/dtos/constants/logFilePath.dto";

@Controller()
@ApiTags('Files Endpoints')
export class FilesController {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,
        @Inject('DuacoderInterface')
        private duacoderService: DuacoderInterface,
        @Inject('FileInterface')
        private fileService: FileInterface
    ) { };

    // @ApiBearerAuth()
    // @UseGuards(AuthGuard)
    @ApiQuery({ name: 'nif', required: true, type: String, example: '11111111A' })
    @Get('getDuacoderPhoto')
    async getDuacoderPhoto(@Query('nif') nif): Promise<string>{
        try {
            return await this.duacoderService.getDuacoderPhoto(nif)
        } catch(err) {
            this.log.error(err);
            throw new BadRequestException(err);
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('downloadLogErrorFile')
    downloadLogErrorFile(@Res() res: Response): void {
        try {
            const filePath = LOG_FILE_PATH;
            res.setHeader('Content-Disposition', `attachment; filename=${path.basename(filePath)}`);
            res.setHeader('Content-Type', 'text/plain');

            res.download(filePath, path.basename(filePath));
        } catch (err) {
            this.log.error(err);
            throw new BadRequestException(err);
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiQuery({ name: 'nif', required: true, type: String, example: '11111111A' })
    @Get('createPDF')
    async createPDF(@Query('nif') nif, @Res() res: Response) {
        try {
            const duacoderInfo = await this.duacoderService.getDuacoderInfo(nif);
            const buffer = await this.fileService.generatePdf(duacoderInfo);

            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=duacoder_${nif}.pdf`,
                'Content-Length': buffer.length,
            })

            res.end(buffer)
        } catch (err) {
            this.log.error(err);
            throw new BadRequestException(err);
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiQuery({ name: 'puesto_id', required: false, type: Number, example: 2 })
    @ApiQuery({ name: 'skill_id', required: false, type: Number, example: 5 })
    @Get('exportExcel')
    async exportExcel(
        @Query('puesto_id') puesto_id: number,
        @Query('skill_id') skill_id: number,
        @Res() res: Response
    ): Promise<void> {
        try {
            const filter = { puesto_id, skill_id };
            const duacoders = await this.duacoderService.getDuacodersForExcel(filter);
            const buffer = await this.fileService.generateExcel(duacoders);
            res.set({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename=duacoders.xlsx`,
            })

            res.end(buffer)
        } catch (err) {
            this.log.error(err);
            throw new BadRequestException(err);
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('uploadDuacoderPhoto')
    @UseInterceptors(FileInterceptor('file'))
    async uploadDuacoderPhoto(@UploadedFile() file, @Body() nif: string): Promise<string> {
        try {
            const uploadedPhoto = await this.duacoderService.uploadDuacoderPhoto(file, nif['nif']);
            if (uploadedPhoto) return 'La foto fue subida con éxito.'
            return 'No se pudo subir la foto, no existe duacoder registrado con ese NIF';
        } catch (err) {
            this.log.error(err);
            throw new BadRequestException(err);
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete('deleteDuacoderPhoto')
    async deleteDuacoderPhoto(@Body() body: DeleteDuacoderPhotoReqDto): Promise<string> {
        try {
            const uploadedPhoto = await this.duacoderService.deleteDuacoderPhoto(body.nif);
            if (uploadedPhoto) return 'La foto fue borrada con éxito.'
            return 'No se pudo subir la foto, no existe duacoder registrado con ese NIF';
        } catch (err) {
            this.log.error(err);
            throw new BadRequestException(err);
        }
    }
}