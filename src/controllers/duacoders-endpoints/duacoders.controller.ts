import { Controller, Post, UseGuards, Req, Get, Query, BadRequestException, Inject } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { DuacoderInfoDto } from "src/core-services/dtos/response/duacoderInfoResponse.dto";
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
}