import { BadRequestException } from "@nestjs/common";
const bcrypt = require('bcrypt');
import * as fs from 'fs';
import { LOG_FILE_PATH } from "../dtos/constants/logFilePath.dto";

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

export function formatDate(inputDate) {
    const date = new Date(inputDate);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export async function clearFileContent(){
    const logFilePath = LOG_FILE_PATH;
    try {
        fs.writeFileSync(logFilePath, '', { flag: 'w' });
        console.log(`Contenido de ${logFilePath} borrado con éxito.`);

    } catch (err){
        console.error(`Error al borrar el contenido de ${logFilePath}:`, err);
    }
}