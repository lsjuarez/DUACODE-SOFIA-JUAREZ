import { Module } from "@nestjs/common";
import { DuacoderCoreModule } from "../core-services/duacoders-core.module";
import { UsersController } from "./users-endpoints/users-endpoints.controller";
import { DuacodersController } from "./duacoders-endpoints/duacoders.controller";
import { FilesController } from "./files-endpoints/files.controller";


@Module({
    imports: [
        DuacoderCoreModule
    ],
    controllers: [
        UsersController,
        DuacodersController,
        FilesController
    ],
})
export class DuacoderPresentationModule {};