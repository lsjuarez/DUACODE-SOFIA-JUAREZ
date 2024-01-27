import { CreateUserRequestDto } from "../../dtos/request/createUserRequest.dto";

export interface UsersInterface {
    login(user: CreateUserRequestDto): Promise<string>
    createUser(user: CreateUserRequestDto): Promise<string>;
}