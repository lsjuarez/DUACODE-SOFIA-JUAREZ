import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class Skills {
    @ApiProperty({
        example: ['React', 'Angular'],
        required: true,
        type: [String]
    })
    @IsNotEmpty({message: 'El nombre del skill no puede estar vacío.'})
    @IsString({
        message: 'Los elementos skills deben ser string',
        each: true,
    })    
    @IsArray()
    skills: string[];
}
export class SkillRequestDto {
    @ApiProperty({ type: Skills})
    @ValidateNested()
    @Type(() => Skills)
    skills: Skills;
}