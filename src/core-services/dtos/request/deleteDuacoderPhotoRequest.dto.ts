import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class DeleteDuacoderPhotoReqDto {
    @ApiProperty({
        name: 'nif',
        example: '12345678P',
        type: String,
        required: true
    })
    @IsNotEmpty({ message: 'NIF no puede estar vacío.'})
    @IsString({ message: 'NIF no posee el formato correcto.'})
    nif: string;
}