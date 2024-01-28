import { Skill } from "../../entities/skills.entity";

export interface SkillsDuacodersRepositoryInterface {
    getSkillsDuacoder(nif: string): Promise<string[]>;
    createSkillsxDuacoder(nif: string, skills_id: number[]): Promise<void>;
}