import { Controller, Post, UseGuards, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";


@Controller()
@ApiTags('Duacoders Endpoints')
export class DuacodersEndpointsController {
    constructor(){};

    @Post('probando')
    //@UseGuards(AuthGuard('jwt'))
    probando(@Req() request: Request){
        const jwt = request.headers['authorization'].split(' ')[1];
        console.log(jwt);
    }
}