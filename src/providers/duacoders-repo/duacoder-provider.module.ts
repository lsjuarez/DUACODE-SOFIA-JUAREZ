import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./repositories";
import { Users } from "./entities/users.entity";
import { Skill } from "./entities/skills.entity";
import { Departamento } from "./entities/departamentos.entity";
import { Puesto } from "./entities/puesto.entity";
import { Duacoder } from "./entities/duacoders.entity";
import { SkillsXDuacoder } from "./entities/skillsXduacoder.entity";
import { DepartamentoRepository } from "./repositories/departamentos/departamento.repository.impl";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Users,
            Skill,
            Departamento,
            Puesto,
            Duacoder,
            SkillsXDuacoder
        ])
    ],
    providers: [
        {
            provide: 'UserRepositoryInterface',
            useClass: UserRepository
        },
        {
            provide: 'DepartamentoRepositoryInterface',
            useClass: DepartamentoRepository
        }
    ],
    exports: [
        {
            provide: 'UserRepositoryInterface',
            useClass: UserRepository
        },
        {
            provide: 'DepartamentoRepositoryInterface',
            useClass: DepartamentoRepository
        }
    ]
})
export class DuacodersRepoModule {};