import { BadRequestException } from "@nestjs/common";
const bcrypt = require('bcrypt');

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