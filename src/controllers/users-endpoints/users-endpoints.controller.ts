import { BadRequestException, Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { UserRequestDto } from "../../core-services/dtos/request/createUserRequest.dto";
import { UsersInterface } from "../../core-services/service/users/users.interface";
import { Users } from "../../providers/duacoders-repo/entities/users.entity";

@Controller()
@ApiTags('Users Endpoints')
export class UsersController {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,
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
            this.log.error(err);
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
            this.log.error(err);
            throw new BadRequestException(err);
        }
    }
}