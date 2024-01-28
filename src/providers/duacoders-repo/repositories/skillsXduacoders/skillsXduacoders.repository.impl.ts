import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SkillsDuacodersRepositoryInterface } from "./skillsXduacoders.interface";
import { SkillsXDuacoder } from "../../entities/skillsXduacoder.entity";
import { SkillsRepositoryInterface } from "../skills/skills.interface";

@Injectable()
export class SkillXduacoderRepository implements SkillsDuacodersRepositoryInterface {
    constructor(
        @InjectRepository(SkillsXDuacoder)
        private skillsXduacoderRepository: Repository<SkillsXDuacoder>,
        @Inject('SkillsRepositoryInterface')
        private skillsRepository: SkillsRepositoryInterface
    ){}
    ;
    
    async getSkillsDuacoder(nif: string): Promise<string[]> {
        const response = await this.skillsXduacoderRepository
        .createQueryBuilder()
        .select()
        .where('duacoder_id = :nif', { nif })
        .execute();
        
        if(!response.length) throw new BadRequestException('El NIF no corresponde con ningun skill.')
        
        const skillsIds = response.map(item => item.SkillsXDuacoder_skills_id);
        const skills = await this.skillsRepository.getSkills(skillsIds);
        
        return skills;
    }
    
    async createSkillsxDuacoder(nif: string, skills_id: number[]): Promise<void> {
        await this.skillsXduacoderRepository
        .createQueryBuilder()
        .insert()
        .values(skills_id.map((skillId) => ({ duacoderId: nif, skillsId: skillId})))
        .execute();
    }

    async deleteSkillsXduacoder(nif: string): Promise<boolean>{
        const response = await this.skillsXduacoderRepository
            .createQueryBuilder()
            .delete()
            .where('duacoder_id = :nif', { nif })
            .execute();
        
        if(response.affected === 0) return false;
        return true;
    }
}