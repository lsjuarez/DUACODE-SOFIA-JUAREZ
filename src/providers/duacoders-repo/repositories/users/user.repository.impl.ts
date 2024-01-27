import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepositoryInterface } from "./user.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserRequestDto } from "src/core-services/dtos/request/createUserRequest.dto";
import { Repository } from "typeorm";
import { Users } from "../../entities/users.entity";

@Injectable()
export class UserRepository implements UserRepositoryInterface {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
    ){} 
    
    async findUser(user: CreateUserRequestDto): Promise<string> {
        try {
            const response = await this.userRepository
                .createQueryBuilder()
                .select(['email'])
                .where(`email = 'pedro1@gmail.com'`)
                .execute();
            console.log(response);
            return 'hola';
        } catch (err) {
            throw new BadRequestException(err);
        }
    }
}