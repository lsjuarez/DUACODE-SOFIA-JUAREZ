export interface SkillsDuacodersRepositoryInterface {
    getSkillsDuacoder(nif: string): Promise<string[]>;
    createSkillsxDuacoder(nif: string, skills_id: number[]): Promise<void>;
    deleteSkillsXduacoder(nif: string): Promise<boolean>;
}