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

    async create(doc: Colaborador) {
        const result = await new this.colaboradorModel(doc).save();
        return result.id;
    }

    async findById(id: string) {
        return this.colaboradorModel.findById(id).exec();
    }

    async update(id: string, colaborador: Colaborador) {
        return this.colaboradorModel.findByIdAndUpdate(id, colaborador).exec();
    }

    async remove(id: string) {
        const colaboradorRemovido = this.colaboradorModel.findOneAndDelete({ _id: id }).exec();

        return (await colaboradorRemovido).remove();
    }
}
