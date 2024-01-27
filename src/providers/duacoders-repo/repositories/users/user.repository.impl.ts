import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepositoryInterface } from "./user.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRequestDto } from "src/core-services/dtos/request/createUserRequest.dto";
import { Repository } from "typeorm";
import { Users } from "../../entities/users.entity";
import { comparePassword, hashPassword } from "../../../../core-services/shared/shared-methods";

@Injectable()
export class UserRepository implements UserRepositoryInterface {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
    ){} 

    async existsUser (user: UserRequestDto): Promise<boolean> {
        try {
            const {email, password } = user;
            const response = await this.userRepository
            .createQueryBuilder()
            .select(['password'])
            .where('email = :email', { email })
            .execute();
            
            if(!response.length) throw new BadRequestException('El usuario no se encuentra registrado.');

            return await comparePassword(password, response[0].password);

        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    async createUser(user: UserRequestDto): Promise<Users> {
        try {
            const { password, email } = user;
            const hashPass = await hashPassword(password);
            const newUser = {
                email: email,
                password: hashPass
            } as Users;
            return await this.userRepository.save(newUser);

        } catch (err){
            throw new BadRequestException(err);
        }
    }
    
}