import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import * as fs from 'fs';
@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
    private logFilePath = 'src\\core-services\\shared\\files\\error.txt';
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) { };

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = exception.getStatus();

        const errorResponse = {
            timestamp: new Date(),
            path: request.url,
            method: request.method,
            status: status,
            response: exception.getResponse()
        };

        this.logger.error({
            method: request.method,
            url: request.url,
            ip: request.ip,
            exception: exception.getResponse(),
            stack: exception.stack,
        });

        const logMessage = `${new Date().toISOString()}: ${exception.message}\n`;
        fs.writeFileSync(this.logFilePath, logMessage, {flag: 'a'});
        response.status(status).json(errorResponse);
    }
}