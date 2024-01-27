import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UsersInterface } from "./users.interface";
import { CreateUserRequestDto } from "../../../core-services/dtos/request/createUserRequest.dto";
import { UserRepositoryInterface } from "../../../providers/duacoders-repo/repositories";

@Injectable()
export class UsersServiceImpl implements UsersInterface {
    constructor(
        @Inject('UserRepositoryInterface')
        private userRepository: UserRepositoryInterface
    ){}
    
    async login(user: CreateUserRequestDto): Promise<string> {
        try{
            return await this.userRepository.findUser(user);
        } catch(err){
            throw new BadRequestException(err);
        }
    }
    createUser(user: CreateUserRequestDto): Promise<string> {
        throw new Error("Method not implemented.");
    }
    
}