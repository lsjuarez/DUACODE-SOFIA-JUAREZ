import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UsersInterface } from "./users.interface";
import { UserRequestDto } from "../../../core-services/dtos/request/createUserRequest.dto";
import { UserRepositoryInterface } from "../../../providers/duacoders-repo/repositories";
import { Users } from "../../../providers/duacoders-repo/entities/users.entity";
import { AuthInterface } from "../auth/auth.interface";

@Injectable()
export class UsersServiceImpl implements UsersInterface {
    constructor(
        @Inject('UserRepositoryInterface')
        private userRepository: UserRepositoryInterface,
        @Inject('AuthInterface')
        private authService: AuthInterface
    ){}
    
    async login(user: UserRequestDto): Promise<string> {
        try{
            const existsUser = await this.userRepository.existsUser(user);
           if(existsUser){
            const token = await this.authService.signPayload({ sub: user.email});
            return token;
           } else {
            throw new BadRequestException('El email o la contraseña es incorrecta.')
           }
        } catch(err){
            throw new BadRequestException(err);
        }
    }

    async createUser(user: UserRequestDto): Promise<Users> {
        try {
            return await this.userRepository.createUser(user);
        } catch(err){
            throw new BadRequestException(err);
        }
    }
    
}