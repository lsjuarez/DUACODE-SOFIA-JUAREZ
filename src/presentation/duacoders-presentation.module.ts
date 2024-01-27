import { Module } from "@nestjs/common";
import { UsersEndpointsController } from "./controllers/users-endpoints/users-endpoints.controller";
import { DuacoderCoreModule } from "../core-services/duacoders-core.module";

@Module({
    imports: [
        DuacoderCoreModule
    ],
    controllers: [
        UsersEndpointsController
    ],
})
export class DuacoderPresentationModule {};