import { ArgumentsHost, Catch, ExceptionFilter, Inject } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { QueryFailedError } from "typeorm";
import { Logger } from "winston";
import * as fs from 'fs';

@Catch(QueryFailedError)
export class SqlErrorFilter implements ExceptionFilter {
    private logFilePath = 'src\\core-services\\shared\\files\\error.txt';
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger
    ) { }

    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = 500;

        const errorResponse = {
            code: status,
            timestamp: new Date(),
            path: request.url,
            method: request.method,
            message: exception.message,
        };

        this.logger.error({
            code: status,
            state: 'ERROR_SQL',
            method: request.method,
            url: request.url,
            ip: request.ip,
            message: exception.message,
        });

        const logMessage = `${new Date().toISOString()}: ${exception.message}\n`;
        fs.writeFileSync(this.logFilePath, logMessage, {flag: 'a'});

        response.status(status).json(errorResponse);
    }
}