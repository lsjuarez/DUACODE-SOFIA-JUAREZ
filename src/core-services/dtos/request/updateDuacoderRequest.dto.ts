import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from "class-validator";

const regex = /^[0-9]{8}[A-Za-z]$/
export class UpdateDuacoderDto {
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
        required: false,
        description: 'Nombre del duacoder',
        type: String
    })
    @IsOptional()
    @IsString({ message: 'El nombre no posee el formato correcto.'})
    nombre?: string;

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
        required: false,
        description: 'Campo que indica si le gusta la tortilla con o sin cebolla.',
        type: Boolean
    })
    @IsOptional()
    @IsBoolean({message: 'El campo no posee el formato correcto.'})
    tortillaConCebolla?: boolean;

    @ApiProperty({
        name: 'puesto_id',
        example: 1,
        required: false,
        description: 'Puesto del duacoder dentro de la empresa.',
        type: Number
    })
    @IsOptional()
    @IsNumber({}, {message: 'El puesto no posee el formato correcto.'})
    puesto_id?: number;

    // @ApiProperty({
    //     name: 'skills_id',
    //     example: [1,2],
    //     required: false,
    //     description: 'Skills que posee el duacoder',
    //     type: [Number]
    // })
    // @IsOptional()
    // skills_id?: number[];

    @ApiProperty({
        name: 'fechaNacimiento',
        example: '1999-09-23',
        required: false,
        description: 'Fecha de nacimiento del duacoder',
        type: String
    })
    @IsOptional()
    fechaNacimiento?: string;
}