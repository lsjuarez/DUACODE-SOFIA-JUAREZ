import { Module } from "@nestjs/common";
import { DuacoderCoreModule } from "src/core-services/duacoders-core.module";
import { DuacodersEndpointsController } from "./duacoders-endpoints/duacoders.controller";
import { UsersEndpointsController } from "./users-endpoints/users-endpoints.controller";


@Module({
    imports: [
        DuacoderCoreModule
    ],
    controllers: [
        UsersEndpointsController,
        DuacodersEndpointsController
    ],
})
export class DuacoderPresentationModule {};