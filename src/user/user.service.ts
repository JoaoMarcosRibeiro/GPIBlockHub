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

    async findById(id: string) {
        return this.userModel.findById(id).exec();
    }

    async findByLogin(login: string) {
        return this.userModel.findOne({login}).exec();
    }

    async update(id: string, user: User) {
        return this.userModel.findByIdAndUpdate(id, user).exec();
    }

    async remove(id: string) {
        const userRemovido = this.userModel.findOneAndDelete({ _id: id }).exec();

        return (await userRemovido).remove();
    }
}
