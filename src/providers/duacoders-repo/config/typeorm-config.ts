import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Users } from "../entities/users.entity";
import { Departamento } from "../entities/departamentos.entity";

require('dotenv').config();

export const typeOrmDuacoderConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DUACODERS_HOST_DB,
    port: +process.env.DUACODERS_PORT_DB,
    username: process.env.DUACODERS_USERNAME_DB,
    password: process.env.DUACODERS_PASSWORD_DB,
    database: process.env.DUACODERS_NAME_DB,
    entities: [Users, Departamento],
    synchronize: true
}