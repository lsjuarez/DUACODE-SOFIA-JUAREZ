import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Users } from "../entities/users.entity";
import { Departamento } from "../entities/departamentos.entity";
import { Skill } from "../entities/skills.entity";
import { Duacoder } from "../entities/duacoders.entity";
import { Puesto } from "../entities/puesto.entity";
import { SkillsXDuacoder } from "../entities/skillsXduacoder.entity";

require('dotenv').config();

export const typeOrmDuacoderConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DUACODERS_HOST_DB,
    port: +process.env.DUACODERS_PORT_DB,
    username: process.env.DUACODERS_USERNAME_DB,
    password: process.env.DUACODERS_PASSWORD_DB,
    database: process.env.DUACODERS_NAME_DB,
    entities: [
        Users,
        Skill,
        Departamento,
        Puesto,
        Duacoder,
        SkillsXDuacoder
    ],
    synchronize: true
}