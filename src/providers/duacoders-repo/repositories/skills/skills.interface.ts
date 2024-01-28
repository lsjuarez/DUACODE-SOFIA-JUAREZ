import { SkillResponseDto } from "../../../../core-services/dtos/response/skillResponse.dto";

export interface SkillsRepositoryInterface {
    getAllSkills(): Promise<SkillResponseDto[]>;
    getSkills(id: number[]): Promise<string[]>;
    createSkills(skills: string[]): Promise<void>;
}