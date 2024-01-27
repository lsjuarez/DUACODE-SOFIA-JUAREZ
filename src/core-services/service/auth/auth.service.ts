import { Injectable } from "@nestjs/common";
import { AuthInterface } from "./auth.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthServiceImpl implements AuthInterface {
    constructor(
        private readonly jwtService: JwtService,
    ){}
    
    async signPayload(payload: any): Promise<string> {
        return this.jwtService.sign(payload);
    }

    async verifyToken(token: string): Promise<any> {
        return this.jwtService.verify(token);
    }
;

    
}