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

    async create(projeto: Projeto) {
        const result = await new this.projetoModel(projeto).save();

        if(!result){
			throw new Error("Erro ao cadastrar projeto")
		}

        return result.id;
    }

    async findAll() {
        return await this.projetoModel.find().exec();
    }

    async findById(id: string) {
        return this.projetoModel.findById(id).exec();
    }

    async update(id: string, projeto: Projeto) {
        const projetoUpdate = this.projetoModel.findByIdAndUpdate(id, projeto).exec();

        if(!projetoUpdate){
			throw new Error("Erro ao atualizar projeto")
		}

        return projetoUpdate
    }

    async remove(id: string) {
        const projetoRemove = this.projetoModel.findOneAndDelete({ _id: id }).exec();

        if(!projetoRemove){
			throw new Error("Erro ao remover projeto")
		}

        return (await projetoRemove).remove();
    }
}