import { Users } from "../../../providers/duacoders-repo/entities/users.entity";
import { UserRequestDto } from "../../dtos/request/createUserRequest.dto";

export interface UsersInterface {
    login(user: UserRequestDto): Promise<string>
    createUser(user: UserRequestDto): Promise<Users>;
}