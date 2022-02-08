import { Module } from '@nestjs/common';
import { ColaboradorProjetoService } from './colaborador-projeto.service';
import { ColaboradorProjetoController } from './colaborador-projeto.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ColaboradorProjetoSchema } from './colaborador-projeto.model';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'ColaboradorProjeto', schema: ColaboradorProjetoSchema,
    }]),
  ],
  providers: [ColaboradorProjetoService],
  controllers: [ColaboradorProjetoController],
})
export class ColaboradorProjetoModule {
}