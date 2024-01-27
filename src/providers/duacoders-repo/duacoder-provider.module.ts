import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./repositories";
import { Users } from "./entities/users.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Users])
    ],
    providers: [
        {
            provide: 'UserRepositoryInterface',
            useClass: UserRepository
        }
    ],
    exports: [
        {
            provide: 'UserRepositoryInterface',
            useClass: UserRepository
        }
    ]
})
export class DuacodersRepoModule {};