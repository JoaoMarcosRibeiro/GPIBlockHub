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

  async findAll() {
    return await this.ColaboradorProjetoModel.find().exec();
  }

  async findById(id: string) {
    return this.ColaboradorProjetoModel.findById(id).exec();
  }

  async update(id: string, colaboradorProjeto: ColaboradorProjeto) {
    const colaboradorProjetoUpdate = this.ColaboradorProjetoModel.findByIdAndUpdate(id, colaboradorProjeto).exec();

    if (!colaboradorProjetoUpdate) {
      throw new Error("Erro ao atualizar relação entre cordenador e projeto")
    }

    return colaboradorProjetoUpdate
  }

  async remove(colaboradorProjeto: ColaboradorProjeto) {
    const colaboradorProjetoRemovido = this.ColaboradorProjetoModel.findOneAndDelete(colaboradorProjeto).exec();

    if(!colaboradorProjetoRemovido){
			throw new Error("Erro ao remover relação entre colaborador e projeto")
		}

    return (await colaboradorProjetoRemovido).remove();
  }
}