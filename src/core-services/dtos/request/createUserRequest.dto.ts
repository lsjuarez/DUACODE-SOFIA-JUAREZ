import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/

export class CreateUserRequestDto {
    @ApiProperty({
        name: 'email',
        example: 'pedropaez@gmail.com',
        required: true,
        description: 'Email para acceder a las apis',
        type: String
    })
    @IsEmail({}, {message: 'Email tiene que tener el formato correcto.'})
    @IsNotEmpty({ message: 'Email no puede estar vacío.'})
    email: string;

    @ApiProperty({
        name: 'password',
        example: 'Probando123!',
        required: true,
        description: 'Contraseña para acceder a las apis',
        type: String
    })
    @IsNotEmpty({ message: 'Password no puede estar vacío.'})
    @MinLength(8, { message: 'Password debe tener al menos 8 caracteres.'})
    @MaxLength(15, { message: 'Password no puede tener más de 15 caracteres.'})
    @Matches(regex, { message: 'Password con formato incorrecto. Se requiere al menos una letra minúscula, una mayúscula, un número y un caracter especial'})
    password: string;
}