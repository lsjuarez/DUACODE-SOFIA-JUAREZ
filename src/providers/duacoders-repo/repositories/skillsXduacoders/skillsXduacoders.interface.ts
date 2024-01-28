import { Skill } from "../../entities/skills.entity";

export interface SkillsDuacodersRepositoryInterface {
    getSkillsDuacoder(nif: string): Promise<string[]>;
}