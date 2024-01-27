import { BadRequestException, Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { CreateUserRequestDto } from "../../../core-services/dtos/request/createUserRequest.dto";
import { UsersInterface } from "../../../core-services/service/users/users.interface";

@Controller()
@ApiTags('Users Endpoints')
export class UsersEndpointsController {
    constructor(
        @Inject('UsersInterface')
        private userService: UsersInterface
    ){};

    @Post('login')
    //@ApiBody({ type: CreateUserRequestDto})
    async login(
        @Body() request: CreateUserRequestDto
    ): Promise<string> {
        try {
            return await this.userService.login(request);
        } catch (err){
            throw new BadRequestException(err);
        }
    }

    @Post('createUser')
    @ApiBody({ type: CreateUserRequestDto})
    async createUser(
        @Body() request: CreateUserRequestDto
    ): Promise<string>{
        const response = await this.userService.createUser(request);
        return response;
    }
}