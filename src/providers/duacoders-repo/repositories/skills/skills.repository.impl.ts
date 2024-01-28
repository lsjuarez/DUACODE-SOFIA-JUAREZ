import { BadRequestException, Injectable } from "@nestjs/common";
import { SkillsRepositoryInterface } from "./skills.interface";
import { Skill } from "../../entities/skills.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class SkillsRepository implements SkillsRepositoryInterface {
    constructor(
        @InjectRepository(Skill)
        private skillRepository: Repository<Skill>
    ){};

    async getSkills(id: number[]): Promise<string[]> {
        const response = await this.skillRepository
            .createQueryBuilder()
            .select()
            .where('id IN (:...ids)', { ids: [id] })
            .execute();

        if(!response.length) throw new BadRequestException('El ID no corresponde con ningun skill.')

        let duacoderSkills: string[] = [];
        for(let skill of response){
            duacoderSkills.push(skill.Skill_nombre)
        }

        return duacoderSkills;
    };
    
}