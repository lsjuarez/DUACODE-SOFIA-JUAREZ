import { SkillResponseDto } from "src/core-services/dtos/response/skillResponse.dto";

export interface SkillsRepositoryInterface {
    getAllSkills(): Promise<SkillResponseDto[]>;
    getSkills(id: number[]): Promise<string[]>;
}