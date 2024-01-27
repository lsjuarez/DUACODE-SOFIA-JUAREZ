import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DuacoderPresentationModule } from './presentation/duacoders-presentation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmDuacoderConfig } from './providers/duacoders-repo/config/typeorm-config';
import { DuacodersRepoModule } from './providers/duacoders-repo/duacoder-provider.module';
import { DuacoderCoreModule } from './core-services/duacoders-core.module';

@Module({
  imports: [
    DuacoderCoreModule,
    DuacodersRepoModule,
    TypeOrmModule.forRoot(typeOrmDuacoderConfig),
    DuacoderPresentationModule
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
