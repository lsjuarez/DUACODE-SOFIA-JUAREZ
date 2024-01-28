import { Module } from "@nestjs/common";
import { DuacodersRepoModule } from "../providers/duacoders-repo/duacoder-provider.module";
import { DuacodersServiceImpl, JwtAuthServiceImpl, UsersServiceImpl } from "./service/index";
import { JwtModule } from "@nestjs/jwt";
import { FileServiceImpl } from "./service/files/file.service";

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
        },
        {
            provide: 'DuacoderInterface',
            useClass: DuacodersServiceImpl
        },
        {
            provide: 'FileInterface',
            useClass: FileServiceImpl
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
        },
        {
            provide: 'DuacoderInterface',
            useClass: DuacodersServiceImpl
        },
        {
            provide: 'FileInterface',
            useClass: FileServiceImpl
        }
    ]
})
export class DuacoderCoreModule {};