import { Controller, Get, Header } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Health')
@Controller()
export class AppController {
  @Get('health')
  @Header('Cache-Control', 'none')
  get() {
    return { ok: true};
  }
}