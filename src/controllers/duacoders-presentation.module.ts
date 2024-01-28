import { Module } from "@nestjs/common";
import { DuacoderCoreModule } from "src/core-services/duacoders-core.module";
import { UsersController } from "./users-endpoints/users-endpoints.controller";
import { DuacodersController } from "./duacoders-endpoints/duacoders.controller";


@Module({
    imports: [
        DuacoderCoreModule
    ],
    controllers: [
        UsersController,
        DuacodersController,
    ],
})
export class DuacoderPresentationModule {};