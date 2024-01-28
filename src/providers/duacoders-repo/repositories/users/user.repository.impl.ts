import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserRepositoryInterface } from "./user.repository.interface";
import { UserRequestDto } from "../../../../core-services/dtos/request/createUserRequest.dto";
import { Users } from "../../entities/users.entity";
import { comparePassword, hashPassword } from "../../../../core-services/shared/shared-methods";

@Injectable()
export class UserRepository implements UserRepositoryInterface {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
    ) { }

    async existsUser(user: UserRequestDto): Promise<boolean> {
        const { email, password } = user;
        const response = await this.userRepository
            .createQueryBuilder()
            .select(['password'])
            .where('email = :email', { email })
            .execute();

        if (!response.length) throw new UnauthorizedException('El usuario no se encuentra registrado.');

        return await comparePassword(password, response[0].password);

    }

    async createUser(user: UserRequestDto): Promise<Users> {
        const { password, email } = user;
        const hashPass = await hashPassword(password);
        const newUser = {
            email: email,
            password: hashPass
        } as Users;
        return await this.userRepository.save(newUser);

    }

}