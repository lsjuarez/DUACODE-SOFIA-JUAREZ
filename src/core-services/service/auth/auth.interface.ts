export interface AuthInterface {
    signPayload(payload: any): Promise<string>;
    verifyToken(token: string): Promise<any>;
}