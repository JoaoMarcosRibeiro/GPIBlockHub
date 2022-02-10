import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Colaborador } from './colaborador.model';
import { Model } from 'mongoose';

@Injectable()
export class ColaboradorService {
    constructor(
        @InjectModel('Colaborador') private readonly colaboradorModel: Model<Colaborador>,
    ) {
    }

    async create(colaborador: Colaborador) {
        const result = await new this.colaboradorModel(colaborador).save();

        if (!result) {
            throw new Error("Erro ao cadastrar colaborador")
        }

        return result.id;
    }

    async findAll() {
        return await this.colaboradorModel.find().exec();
    }

    async findById(id: string) {
        return this.colaboradorModel.findById(id).exec();
    }

    async update(id: string, colaborador: Colaborador) {
        const colaboradorUpdate = this.colaboradorModel.findByIdAndUpdate(id, colaborador).exec();

        if (!colaboradorUpdate) {

            throw new Error("Erro ao atualizar colaborador")
        }

        return colaboradorUpdate
    }

    async remove(id: string) {
        const colaboradorRemove = this.colaboradorModel.findOneAndDelete({ _id: id }).exec();

        if (!colaboradorRemove) {

            throw new Error("Erro ao remover colaborador")
        }

        return (await colaboradorRemove).remove();
    }
}
