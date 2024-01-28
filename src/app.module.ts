import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { DuacoderPresentationModule } from './controllers/duacoders-presentation.module';
import { typeOrmDuacoderConfig } from './providers/duacoders-repo/config/typeorm-config';
import { DuacodersRepoModule } from './providers/duacoders-repo/duacoder-provider.module';
import { DuacoderCoreModule } from './core-services/duacoders-core.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './core-services/shared/filters/http-error.filters';
import { SqlErrorFilter } from './core-services/shared/filters/sql-error.filter';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './providers/duacoders-repo/config/winston.config';

@Module({
  imports: [
    WinstonModule.forRoot(winstonConfig),
    DuacoderCoreModule,
    DuacodersRepoModule,
    TypeOrmModule.forRoot(typeOrmDuacoderConfig),
    DuacoderPresentationModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'super-secret-user',
      signOptions: { expiresIn: '1h'}
    })
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_FILTER,
      useClass: SqlErrorFilter
    }
  ],
  controllers: [AppController],
  exports: []
})
export class AppModule {}
