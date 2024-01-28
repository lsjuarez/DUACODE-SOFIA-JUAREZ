import { Controller, Post, UseGuards, Req, Get, Query, BadRequestException, Inject, Body, Delete, Put, DefaultValuePipe, ParseIntPipe, UseInterceptors, UploadedFile, Param, Res, Logger } from "@nestjs/common";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateDuacoderDto } from "src/core-services/dtos/request/createDuacoderRequest.dto";
import { DeleteDuacoderRequestDto } from "src/core-services/dtos/request/deleteDuacoderRequest.dto";
import { UpdateDuacoderDto } from "src/core-services/dtos/request/updateDuacoderRequest.dto";
import { DuacoderInfoDto } from "src/core-services/dtos/response/duacoderInfoResponse.dto";
import { PuestoDtoResponse } from "src/core-services/dtos/response/puestoResponse.dto";
import { SkillResponseDto } from "src/core-services/dtos/response/skillResponse.dto";
import { DuacoderInterface } from "src/core-services/service/duacoders/duacoders.interface";
import { FileInterface } from "src/core-services/service/files/file.interface";
import { AuthGuard } from "src/core-services/service/auth/jwt-auth.guard";
import { SkillRequestDto } from "src/core-services/dtos/request/skillsRequest.dto";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import * as path from 'path';

@Controller()
@ApiTags('Duacoders Endpoints')
export class DuacodersController {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,
        @Inject('DuacoderInterface')
        private duacoderService: DuacoderInterface,
        @Inject('FileInterface')
        private fileService: FileInterface
    ) { };

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiQuery({ name: 'nif', required: true, type: String, example: '11111111A' })
    @Get('getDuacoderInfo')
    async getDuacoderInfo(@Query('nif') nif): Promise<DuacoderInfoDto> {
        try {
            return await this.duacoderService.getDuacoderInfo(nif);
        } catch (err) {
            this.log.error(err);
            throw new BadRequestException(err);
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('getPuestos')
    async getPuestos(): Promise<PuestoDtoResponse[]> {
        try {
            return await this.duacoderService.getPuestos();
        } catch (err) {
            this.log.error(err);
            throw new BadRequestException(err);
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('getSkills')
    async getSkills(): Promise<SkillResponseDto[]> {
        try {
            return await this.duacoderService.getSkills();
        } catch (err) {
            this.log.error(err);
            throw new BadRequestException(err);
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('createDuacoder')
    async createDuacoder(@Body() duacoder: CreateDuacoderDto): Promise<DuacoderInfoDto> {
        try {
            return await this.duacoderService.createDuacoder(duacoder);
        } catch (err) {
            this.log.error(err);
            throw new BadRequestException(err)
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete('deleteDuacoder')
    async deleteDuacoder(@Body() duacoder: DeleteDuacoderRequestDto): Promise<Boolean> {
        try {
            return await this.duacoderService.deleteDuacoder(duacoder);
        } catch (err) {
            this.log.error(err);
            throw new BadRequestException(err);
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put('updateDuacoder')
    async updateDuacoder(@Body() duacoder: UpdateDuacoderDto): Promise<DuacoderInfoDto> {
        try {
            return await this.duacoderService.updateDuacoder(duacoder);
        } catch (err) {
            this.log.error(err);
            throw new BadRequestException(err);
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiQuery({ name: 'page', required: true, type: Number, example: 1 })
    @ApiQuery({ name: 'pageSize', required: true, type: Number, example: 2 })
    @ApiQuery({ name: 'puesto_id', required: false, type: Number, example: 2 })
    @ApiQuery({ name: 'skill_id', required: false, type: Number, example: 5 })
    @Get('getDuacoders')
    async getUsers(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('pageSize', new DefaultValuePipe(5), ParseIntPipe) pageSize: number,
        @Query('puesto_id') puesto_id: number,
        @Query('skill_id') skill_id: number
    ): Promise<DuacoderInfoDto[]> {
        try {
            const filter = { puesto_id, skill_id };
            return await this.duacoderService.getDuacoders(page, pageSize, filter);
        } catch (err) {
            this.log.error(err);
            throw new BadRequestException(err)
        }
    }

    // @ApiBearerAuth()
    // @UseGuards(AuthGuard)
    // @Post('createSkills')
    // @ApiBody({ type: SkillRequestDto})
    // async createSkills(@Body() skills: SkillRequestDto) {
    //     try {
    //         console.log(skills);
    //     } catch(err){
    //         throw new BadRequestException(err);
    //     }
    // }

    // @Post('createPuesto')
    // async createPuesto() {

    // }

    // @Put('updateSkillsxDuacoder')
    // async updateSkillsxDuacoder() {

    // }

    // @Post('createExcel')
    // async createExcel() {

    // }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('downloadLogErrorFile')
    downloadLogErrorFile(@Res() res: Response): void {
        try {
            const filePath = 'src\\core-services\\shared\\files\\error.txt';
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

    // @Post('uploadDuacoderPhoto')
    // @UseInterceptors(FileInterceptor('file'))
    // async uploadDuacoderPhoto(@UploadedFile() file, @Body() nif: string): Promise<string> {
    //     try {
    //         const uploadedPhoto = await this.duacoderService.uploadDuacoderPhoto(file, nif);
    //         if(uploadedPhoto) return 'La foto fue subida con éxito.'
    //         return 'No se pudo subir la foto, no existe duacoder registrado con ese NIF';
    //     } catch (err) {
    //         throw new BadRequestException(err);
    //     }
    // } 
}