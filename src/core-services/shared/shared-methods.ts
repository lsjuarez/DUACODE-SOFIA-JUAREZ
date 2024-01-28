import { BadRequestException } from "@nestjs/common";
const bcrypt = require('bcrypt');
import * as fs from 'fs';

export async function hashPassword(password: string): Promise<string>{
    try {
        return await bcrypt.hash(password, 10);
    } catch(err){
        throw new BadRequestException(err);
    }
};

export async function comparePassword(password: string, hashPass: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, hashPass);
    } catch(err){
        throw new BadRequestException(err);
    }
}

export async function clearFileContent(){
    const logFilePath = 'src\\core-services\\shared\\files\\error.txt';
    try {
        fs.writeFileSync(logFilePath, '', { flag: 'w' });
        console.log(`Contenido de ${logFilePath} borrado con éxito.`);

    } catch (err){
        console.error(`Error al borrar el contenido de ${logFilePath}:`, err);
    }
}