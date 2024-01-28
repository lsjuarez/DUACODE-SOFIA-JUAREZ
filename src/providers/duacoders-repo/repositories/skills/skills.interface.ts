export interface SkillsRepositoryInterface {
    getSkills(id: number[]): Promise<string[]>;
}