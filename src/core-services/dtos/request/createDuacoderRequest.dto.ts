import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, ValidateNested } from "class-validator";

const regex = /^[0-9]{8}[A-Za-z]$/
export class CreateDuacoderDto {
    @ApiProperty({
        name: 'nif',
        example: '12345678P',
        required: true,
        description: 'NIF de duacoder',
        type: String
    })
    @IsNotEmpty({ message: 'NIF no puede estar vacío.'})
    @Matches(regex, { message: 'NIF no posee el formato correcto. Debe poseer 8 números y una letra al final'})
    nif!: string;

    @ApiProperty({
        name: 'nombre',
        example: 'Sofia',
        required: true,
        description: 'Nombre del duacoder',
        type: String
    })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío.'})
    @IsString({ message: 'El nombre no posee el formato correcto.'})
    nombre!: string;

    @ApiProperty({
        name: 'biografia',
        example: 'Tiene 2 perros y 1 gato.',
        required: false,
        description: 'Información adicional del duacoder.',
        type: String
    })
    @IsOptional()
    @IsString({ message: 'La biografia no posee el formato correcto.'})
    biografia?: string;

    @ApiProperty({
        name: 'tortillaConCebolla',
        example: 'true',
        required: true,
        description: 'Campo que indica si le gusta la tortilla con o sin cebolla.',
        type: Boolean
    })
    @IsNotEmpty({message: 'El campo no puede estar vacío.'})
    @IsBoolean({message: 'El campo no posee el formato correcto.'})
    tortillaConCebolla!: boolean;

    @ApiProperty({
        name: 'puesto_id',
        example: 1,
        required: true,
        description: 'Puesto del duacoder dentro de la empresa.',
        type: Number
    })
    @IsNotEmpty({ message: 'El puesto no puede estar vacío.'})
    @IsNumber({}, {message: 'El puesto no posee el formato correcto.'})
    puesto_id!: number;

    @ApiProperty({
        name: 'skills_id',
        example: [1,2],
        required: true,
        description: 'Skills que posee el duacoder',
        type: [Number]
    })
    @IsNotEmpty({ message: 'El puesto no puede estar vacío.'})
    skills_id!: number[];

    @ApiProperty({
        name: 'fechaNacimiento',
        example: '1999-09-23',
        required: true,
        description: 'Fecha de nacimiento del duacoder',
        type: String
    })
    @IsOptional()
    fechaNacimiento: string;
}