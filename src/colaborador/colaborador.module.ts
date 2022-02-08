import { Module } from '@nestjs/common';
import { ColaboradorService } from './colaborador.service';
import { ColaboradorController } from './colaborador.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ColaboradorSchema } from './colaborador.model';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Colaborador', schema: ColaboradorSchema,
    }]),
  ],
  providers: [ColaboradorService],
  controllers: [ColaboradorController],
})
export class ColaboradorModule {
}