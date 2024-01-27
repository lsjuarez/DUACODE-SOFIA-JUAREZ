import { Module } from "@nestjs/common";
import { DuacodersRepoModule } from "../providers/duacoders-repo/duacoder-provider.module";
import { JwtAuthServiceImpl, UsersServiceImpl } from "./service/index";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        DuacodersRepoModule,
        JwtModule.register({
            secret: 'super-secret-user',
            signOptions: { expiresIn: '1h'}
        })
    ],
    providers: [
        {
            provide: 'UsersInterface',
            useClass: UsersServiceImpl
        },
        {
            provide: 'AuthInterface',
            useClass: JwtAuthServiceImpl
        }
    ],
    exports: [
        {
            provide: 'UsersInterface',
            useClass: UsersServiceImpl
        },
        {
            provide: 'AuthInterface',
            useClass: JwtAuthServiceImpl
        }
    ]
})
export class DuacoderCoreModule {};