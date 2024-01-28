import { Controller, Post, UseGuards, Req, Get, Query, BadRequestException, Inject, Body } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateDuacoderDto } from "src/core-services/dtos/request/createDuacoderRequest.dto";
import { DuacoderInfoDto } from "src/core-services/dtos/response/duacoderInfoResponse.dto";
import { PuestoDtoResponse } from "src/core-services/dtos/response/puestoResponse.dto";
import { SkillResponseDto } from "src/core-services/dtos/response/skillResponse.dto";
import { JwtAuthGuard } from "src/core-services/service/auth/jwt-auth.guard";
import { DuacoderInterface } from "src/core-services/service/duacoders/duacoders.interface";


@Controller()
@ApiTags('Duacoders Endpoints')
export class DuacodersEndpointsController {
    constructor(
        @Inject('DuacoderInterface')
        private duacoderService: DuacoderInterface
    ){};

    // @Post('probando')
    // //@UseGuards(JwtAuthGuard)
    // probando(@Req() request: Request){
    //     const jwt = request.headers['authorization'].split(' ')[1];
    //     console.log(jwt);
    // }

    @ApiQuery({ name: 'nif', required: true, type: String, example: '11111111A'})
    @Get('getDuacoderInfo')
    async getDuacoderInfo(@Query('nif') nif): Promise<DuacoderInfoDto> {
        try {
            return await this.duacoderService.getDuacoderInfo(nif);
        } catch(err) {
            throw new BadRequestException(err);
        }
    }

    @Get('getPuestos')
    async getPuestos(): Promise<PuestoDtoResponse[]> {
        try {
            return await this.duacoderService.getPuestos();
        } catch(err){
            throw new BadRequestException(err);
        }
    }

    @Get('getSkills')
    async getSkills(): Promise<SkillResponseDto[]>{
        try {
            return await this.duacoderService.getSkills();
        } catch(err){
            throw new BadRequestException(err);
        }
    }

    @Post('createDuacoder')
    async createDuacoder(@Body() duacoder:CreateDuacoderDto): Promise<DuacoderInfoDto> {
        try{
            return await this.duacoderService.createDuacoder(duacoder);
        } catch(err){
            throw new BadRequestException(err)
        }
    }
}