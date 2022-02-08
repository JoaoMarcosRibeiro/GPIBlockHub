import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ) {
    }

    async create(doc: User) {
        const result = await new this.userModel(doc).save();
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
        const userUpdate = this.userModel.findByIdAndUpdate(id, user).exec();

        if(!userUpdate){
			throw new Error("Erro ao atualizar usuário")
		}

        return userUpdate
    }

    async remove(id: string) {
        const userRemove = this.userModel.findOneAndDelete({ _id: id }).exec();

        if(!userRemove){
			throw new Error("Erro ao remover usuário")
		}

        return (await userRemove).remove();
    }
}
