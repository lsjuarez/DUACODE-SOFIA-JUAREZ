import { ApiProperty } from "@nestjs/swagger";
import { IsString, ArrayNotEmpty, ArrayUnique, IsArray } from "class-validator";

export class DepartamentoRequestDto {
    @ApiProperty({
        example: ['Contaduria', 'Legales'],
        required: true,
        type: [String]
    })
    @IsString({
        message: 'Los elementos departamentos deben ser string',
        each: true,
    })   
    @ArrayNotEmpty({ message: 'departamentos array cannot be empty' })
    @ArrayUnique({ message: 'departamentos array must not contain duplicate values' }) 
    @IsArray()
    departamentos: string[];
}