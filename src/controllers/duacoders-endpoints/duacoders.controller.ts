import { Controller, Post, UseGuards, Req, Get, Query, BadRequestException, Inject, Body, Delete, Put, DefaultValuePipe, ParseIntPipe, UseInterceptors, UploadedFile, Param, Res } from "@nestjs/common";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { Response } from 'express';
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateDuacoderDto } from "src/core-services/dtos/request/createDuacoderRequest.dto";
import { DeleteDuacoderRequestDto } from "src/core-services/dtos/request/deleteDuacoderRequest.dto";
import { UpdateDuacoderDto } from "src/core-services/dtos/request/updateDuacoderRequest.dto";
import { DuacoderInfoDto } from "src/core-services/dtos/response/duacoderInfoResponse.dto";
import { PuestoDtoResponse } from "src/core-services/dtos/response/puestoResponse.dto";
import { SkillResponseDto } from "src/core-services/dtos/response/skillResponse.dto";
import { JwtAuthGuard } from "src/core-services/service/auth/jwt-auth.guard";
import { DuacoderInterface } from "src/core-services/service/duacoders/duacoders.interface";
import { FileInterface } from "src/core-services/service/files/file.interface";


@Controller()
@ApiTags('Duacoders Endpoints')
export class DuacodersController {
    constructor(
        @Inject('DuacoderInterface')
        private duacoderService: DuacoderInterface,
        @Inject('FileInterface')
        private fileService: FileInterface
    ) { };

    // @Post('probando')
    // //@UseGuards(JwtAuthGuard)
    // probando(@Req() request: Request){
    //     const jwt = request.headers['authorization'].split(' ')[1];
    //     console.log(jwt);
    // }

    @ApiQuery({ name: 'nif', required: true, type: String, example: '11111111A' })
    @Get('getDuacoderInfo')
    async getDuacoderInfo(@Query('nif') nif): Promise<DuacoderInfoDto> {
        try {
            return await this.duacoderService.getDuacoderInfo(nif);
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    @Get('getPuestos')
    async getPuestos(): Promise<PuestoDtoResponse[]> {
        try {
            return await this.duacoderService.getPuestos();
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    @Get('getSkills')
    async getSkills(): Promise<SkillResponseDto[]> {
        try {
            return await this.duacoderService.getSkills();
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    @Post('createDuacoder')
    async createDuacoder(@Body() duacoder: CreateDuacoderDto): Promise<DuacoderInfoDto> {
        try {
            return await this.duacoderService.createDuacoder(duacoder);
        } catch (err) {
            throw new BadRequestException(err)
        }
    }

    @Delete('deleteDuacoder')
    async deleteDuacoder(@Body() duacoder: DeleteDuacoderRequestDto): Promise<Boolean> {
        try {
            return await this.duacoderService.deleteDuacoder(duacoder);
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    @Put('updateDuacoder')
    async updateDuacoder(@Body() duacoder: UpdateDuacoderDto): Promise<DuacoderInfoDto> {
        try {
            return await this.duacoderService.updateDuacoder(duacoder);
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

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
            throw new BadRequestException(err)
        }
    }

    // @Post('createSkills')
    // async createSkills() {

    // }

    // @Post('createPuesto')
    // async createPuesto() {

    // }

    // @Delete('deleteSkill')
    // async deleteSkill() {

    // }

    // @Delete('deletePuesto')
    // async deletePuesto() {

    // }

    // @Put('updateSkillsxDuacoder')
    // async updateSkillsxDuacoder() {

    // }

    // @Post('createExcel')
    // async createExcel() {

    // }

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