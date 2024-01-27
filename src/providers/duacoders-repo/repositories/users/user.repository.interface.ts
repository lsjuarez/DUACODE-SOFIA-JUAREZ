import { UserRequestDto } from "../../../../core-services/dtos/request/createUserRequest.dto";
import { Users } from "../../entities/users.entity";

export interface UserRepositoryInterface {
    existsUser(user: UserRequestDto): Promise<boolean>;
    createUser(user: UserRequestDto): Promise<Users>;
}