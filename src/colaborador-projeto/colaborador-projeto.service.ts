import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ColaboradorProjeto } from './colaborador-projeto.model';
import { Model } from 'mongoose';

@Injectable()
export class ColaboradorProjetoService {
  constructor(
    @InjectModel('ColaboradorProjeto') private readonly ColaboradorProjetoModel: Model<ColaboradorProjeto>,
  ) {
  }

  async create(doc: ColaboradorProjeto) {
    const result = await new this.ColaboradorProjetoModel(doc).save();
    return result.id;
  }

  async findById(id: string) {
    return this.ColaboradorProjetoModel.findById(id).exec();
  }

  async update(id: string, colaboradorProjeto: ColaboradorProjeto) {
    return this.ColaboradorProjetoModel.findByIdAndUpdate(id, colaboradorProjeto).exec();
  }

  async remove(colaboradorProjeto: ColaboradorProjeto) {
    const colaboradorProjetoRemovido = this.ColaboradorProjetoModel.findOneAndDelete(colaboradorProjeto).exec();

        return (await colaboradorProjetoRemovido).remove();
  }
}