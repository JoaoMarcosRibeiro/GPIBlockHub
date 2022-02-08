import { Module } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { ProjetoController } from './projeto.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjetoSchema } from './projeto.model';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Projeto', schema: ProjetoSchema,
    }]),
  ],
  providers: [ProjetoService],
  controllers: [ProjetoController],
})
export class ProjetoModule {
}