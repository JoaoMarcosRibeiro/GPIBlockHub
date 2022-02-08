import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ProjetoModule } from './projeto/projeto.module';
import { ColaboradorModule } from './colaborador/colaborador.module';
import { ColaboradorProjetoModule } from './colaborador-projeto/colaborador-projeto.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/GPI'),
    UserModule,
    ProjetoModule,
    ColaboradorModule,
    ColaboradorProjetoModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
