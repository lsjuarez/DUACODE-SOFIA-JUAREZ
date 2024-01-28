import { BadRequestException, Body, Controller, Inject, Post, ValidationPipe } from "@nestjs/common";
import { UserRequestDto } from "../../core-services/dtos/request/createUserRequest.dto";
import { UsersInterface } from "../../core-services/service/users/users.interface";
import { Users } from "../../providers/duacoders-repo/entities/users.entity";
import { ApiBody, ApiTags } from "@nestjs/swagger";

@Controller()
@ApiTags('Users Endpoints')
export class UsersEndpointsController {
    constructor(
        @Inject('UsersInterface')
        private userService: UsersInterface
    ){};

    @Post('login')
    @ApiBody({ type: UserRequestDto})
    async login(
        @Body() request: UserRequestDto
    ): Promise<string> {
        try {
            return await this.userService.login(request);
        } catch (err){
            throw new BadRequestException(err);
        }
    }

    @Post('createUser')
    @ApiBody({ type: UserRequestDto})
    async createUser(
        @Body() user: UserRequestDto
    ): Promise<Users>{
        try {     
            return  await this.userService.createUser(user);
        } catch(err) {
            throw new BadRequestException(err);
        }
    }
}