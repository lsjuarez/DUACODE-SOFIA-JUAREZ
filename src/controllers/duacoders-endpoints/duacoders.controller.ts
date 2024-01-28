import { Controller, Post, UseGuards, Get, Query, BadRequestException, Inject, Body, Delete, Put, DefaultValuePipe, ParseIntPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { CreateDuacoderDto } from "../../core-services/dtos/request/createDuacoderRequest.dto";
import { DeleteDuacoderRequestDto } from "../../core-services/dtos/request/deleteDuacoderRequest.dto";
import { UpdateDuacoderDto } from "../../core-services/dtos/request/updateDuacoderRequest.dto";
import { DuacoderInfoDto } from "../../core-services/dtos/response/duacoderInfoResponse.dto";
import { PuestoDtoResponse } from "../../core-services/dtos/response/puestoResponse.dto";
import { SkillResponseDto } from "../../core-services/dtos/response/skillResponse.dto";
import { DuacoderInterface } from "../../core-services/service/duacoders/duacoders.interface";
import { AuthGuard } from "../../core-services/service/auth/jwt-auth.guard";
import { SkillRequestDto } from "../../core-services/dtos/request/skillsRequest.dto";
import { DepartamentoRequestDto } from "../../core-services/dtos/request/puestoRequest.dto";

@Controller()
@ApiTags('Duacoders Endpoints')
export class DuacodersController {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,
        @Inject('DuacoderInterface')
        private duacoderService: DuacoderInterface,
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

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('createSkills')
    @ApiBody({ type: SkillRequestDto})
    async createSkills(@Body() body: SkillRequestDto[]) {
        try {
            return await this.duacoderService.createSkills(body['skills']) ;
        } catch(err){
            this.log.error(err);
            throw new BadRequestException(err);
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('createDepartamento')
    @ApiBody({ type: DepartamentoRequestDto})
    async createDeparatamento(@Body() body: DepartamentoRequestDto[]) {
        try {
            return await this.duacoderService.createDepartamentos(body['departamentos']) ;
        } catch(err){
            this.log.error(err);
            throw new BadRequestException(err);
        }
    }
}