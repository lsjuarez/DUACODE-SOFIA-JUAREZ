import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SkillsRepositoryInterface } from "./skills.interface";
import { Skill } from "../../entities/skills.entity";
import { SkillResponseDto } from "../../../../core-services/dtos/response/skillResponse.dto";

@Injectable()
export class SkillsRepository implements SkillsRepositoryInterface {
    constructor(
        @InjectRepository(Skill)
        private skillRepository: Repository<Skill>
    ){}

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

    async getAllSkills(): Promise<SkillResponseDto[]> {
        const response = await this.skillRepository
            .createQueryBuilder()
            .select()
            .execute()
        
        if(!response.length) throw new BadRequestException('No hay ninguna skill registrada.')

        let skills: SkillResponseDto[] = [];
        for(let skill of response){
            const sk = {
                skill_id: skill.Skill_id,
                nombre: skill.Skill_nombre
            } as SkillResponseDto;
            skills.push(sk);
        }
        return skills;
    }

    async createSkills(skills: string[]): Promise<void> {
        const skillObjects = skills.map(skillName => ({ nombre: skillName }));
        await this.skillRepository
            .createQueryBuilder()
            .insert()
            .values(skillObjects)
            .execute()
    }
    
}