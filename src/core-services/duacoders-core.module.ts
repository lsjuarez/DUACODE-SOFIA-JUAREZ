import { Module } from "@nestjs/common";
import { DuacodersRepoModule } from "../providers/duacoders-repo/duacoder-provider.module";
import { UsersServiceImpl } from "./service/index";

@Module({
    imports: [
        DuacodersRepoModule
    ],
    providers: [
        {
            provide: 'UsersInterface',
            useClass: UsersServiceImpl
        },
    ],
    exports: [
        {
            provide: 'UsersInterface',
            useClass: UsersServiceImpl
        },
    ]
})
export class DuacoderCoreModule {};