import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { DuacoderPresentationModule } from './controllers/duacoders-presentation.module';
import { typeOrmDuacoderConfig } from './providers/duacoders-repo/config/typeorm-config';
import { DuacodersRepoModule } from './providers/duacoders-repo/duacoder-provider.module';
import { DuacoderCoreModule } from './core-services/duacoders-core.module';

@Module({
  imports: [
    DuacoderCoreModule,
    DuacodersRepoModule,
    TypeOrmModule.forRoot(typeOrmDuacoderConfig),
    DuacoderPresentationModule,
    // JwtModule.register({
    //   secret: 'super-secret-user',
    //   signOptions: { expiresIn: '1h'}
    // })
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
