import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class DeleteDuacoderRequestDto {
    @ApiProperty({
        name: 'nif',
        example: '12345678P',
        required: true,
        type: String
    })
    @IsNotEmpty({ message: 'El NIF no puede estar vacío.'})
    @IsString({ message: 'NIF no posee formato correcto.'})
    nif: string;
}