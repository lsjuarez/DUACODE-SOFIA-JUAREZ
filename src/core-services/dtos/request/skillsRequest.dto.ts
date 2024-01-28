import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, ArrayUnique, IsArray, IsString } from "class-validator";
export class SkillRequestDto {
    @ApiProperty({
        example: ['React', 'Angular'],
        required: true,
        type: [String]
    })
    @IsString({
        message: 'Los elementos skills deben ser string',
        each: true,
    })   
    @ArrayNotEmpty({ message: 'Skills array cannot be empty' })
    @ArrayUnique({ message: 'Skills array must not contain duplicate values' }) 
    @IsArray()
    skills: string[];
}