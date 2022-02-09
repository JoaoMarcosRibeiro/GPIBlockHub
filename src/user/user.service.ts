import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ) {
    }

    async create(user: User) {
        const result = await new this.userModel(user).save();
        return result.id;
    }

    async findAll() {
        return await this.userModel.find().exec();
    }

    async findById(id: string) {
        return this.userModel.findById(id).exec();
    }

    async findByLogin(login: string) {
        return this.userModel.findOne({ login }).exec();
    }

    async update(id: string, user: User) {
        const userUpdate = await this.userModel.findById(id);

        user.senha = await bcrypt.hash(userUpdate.senha, 10); //cria novo hash

        const result = await this.userModel.updateOne({ _id: id }, user).exec();

        if (!result) {
            throw new Error("Erro na atualização de usuário")
        }

        return this.userModel.findById(id);
    }

    async remove(id: string) {
        const userRemove = this.userModel.findOneAndDelete({ _id: id }).exec();

        if (!userRemove) {
            throw new Error("Erro ao remover usuário")
        }

        return (await userRemove).remove();
    }
}
