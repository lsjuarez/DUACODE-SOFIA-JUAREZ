import { CreateUserRequestDto } from "../../../../core-services/dtos/request/createUserRequest.dto";

export interface UserRepositoryInterface {
    findUser(user: CreateUserRequestDto): Promise<string>;
}