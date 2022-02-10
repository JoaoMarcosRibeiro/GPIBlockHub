import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ColaboradorProjeto } from './colaborador-projeto.model';
import { Model } from 'mongoose';

@Injectable()
export class ColaboradorProjetoService {
  constructor(
    @InjectModel('ColaboradorProjeto') private readonly ColaboradorProjetoModel: Model<ColaboradorProjeto>,
  ) {
  }

  async create(colaboradorProjeto: ColaboradorProjeto) {
    const createColaboradorProjeto = new this.ColaboradorProjetoModel(colaboradorProjeto);

    const verificaConflito = await this.verificarConflito(createColaboradorProjeto, "");

    if (verificaConflito || (createColaboradorProjeto.fim && createColaboradorProjeto.fim < createColaboradorProjeto.inicio)) {
      throw new PreconditionFailedException();
    }

    const result = createColaboradorProjeto.save();

    if (!result) {
      throw new Error("Erro ao cadastrar relação entre colaborador e projeto")
    }

    return createColaboradorProjeto.id;
  }

  async findAll() {
    return await this.ColaboradorProjetoModel.find().exec();
  }

  async findById(id: string) {
    return this.ColaboradorProjetoModel.findById(id).exec();
  }

  async update(id: string, colaboradorProjeto: ColaboradorProjeto) {
    const colaboradorProjetoUpdate = await this.ColaboradorProjetoModel.findById(id);

    colaboradorProjetoUpdate.inicio = colaboradorProjeto.inicio;

    colaboradorProjetoUpdate.fim = colaboradorProjeto.fim;

    const verificaConflito = await this.verificarConflito(colaboradorProjetoUpdate, id);

    if (verificaConflito || (colaboradorProjetoUpdate.fim && colaboradorProjetoUpdate.fim < colaboradorProjetoUpdate.inicio)) {

      throw new PreconditionFailedException();
    }

    const result = await this.ColaboradorProjetoModel.updateOne({ _id: id }, colaboradorProjeto).exec();

    if (!result) {

      throw new Error("Erro na atualização da relação entre colaborador e projeto")
    }

    return this.ColaboradorProjetoModel.findById(id);
  }

  async remove(colaboradorProjeto: ColaboradorProjeto) {
    const colaboradorProjetoRemovido = this.ColaboradorProjetoModel.findOneAndDelete(colaboradorProjeto).exec();

    if (!colaboradorProjetoRemovido) {

      throw new Error("Erro ao remover relação entre colaborador e projeto")
    }

    return (await colaboradorProjetoRemovido).remove();
  }

  async verificarConflito(colaboradorProjeto: ColaboradorProjeto, updatedId: string) {
    const conflito = await this.ColaboradorProjetoModel.find({ ProjetoId: colaboradorProjeto.ProjetoId, ColaboradorId: colaboradorProjeto.ColaboradorId }).exec();

    if (conflito) {

      for (let i = 0; i < conflito.length; i++) {
        const element = conflito[i];

        if (element.id !== updatedId) {

          if ((colaboradorProjeto.inicio >= element.inicio && colaboradorProjeto.inicio <= element.fim) ||
            (colaboradorProjeto.fim >= element.inicio && colaboradorProjeto.fim <= element.fim) ||
            (colaboradorProjeto.inicio <= element.inicio && colaboradorProjeto.fim >= element.fim)) {

            return true;
          }
        }
      }
    }

    return false;
  }
}