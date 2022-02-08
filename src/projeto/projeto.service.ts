import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Projeto } from './projeto.model';
import { Model } from 'mongoose';

@Injectable()
export class ProjetoService {
    constructor(
        @InjectModel('Projeto') private readonly projetoModel: Model<Projeto>,
    ) {
    }

    async create(doc: Projeto) {
        const result = await new this.projetoModel(doc).save();
        return result.id;
    }

    async findById(id: string) {
        return this.projetoModel.findById(id).exec();
    }

    async update(id: string, projeto: Projeto) {
        return this.projetoModel.findByIdAndUpdate(id, projeto).exec();
    }

    async remove(id: string) {
        const projetoRemovido = this.projetoModel.findOneAndDelete({ _id: id }).exec();

        return (await projetoRemovido).remove();
    }
}