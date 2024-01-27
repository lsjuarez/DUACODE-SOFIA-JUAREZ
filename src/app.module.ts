import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { DuacoderPresentationModule } from './controllers/duacoders-presentation.module';
import { typeOrmDuacoderConfig } from './providers/duacoders-repo/config/typeorm-config';
import { DuacodersRepoModule } from './providers/duacoders-repo/duacoder-provider.module';
import { DuacoderCoreModule } from './core-services/duacoders-core.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    DuacoderCoreModule,
    DuacodersRepoModule,
    TypeOrmModule.forRoot(typeOrmDuacoderConfig),
    DuacoderPresentationModule,
    PassportModule,
    JwtModule.register({
      secret: 'super-secret-user',
      signOptions: { expiresIn: '1h'}
    })
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
