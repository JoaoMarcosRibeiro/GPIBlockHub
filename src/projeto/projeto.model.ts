import * as mongoose from 'mongoose';

export const ProjetoSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    descricao: { type: String },
    inicio: { type: Date, required: true },
    fim: { type: Date },
    active: { type: Boolean },
});

export interface Projeto {
    id: string;
    name: string;
    descricao: string;
    inicio: Date;
    fim: Date;
    active: boolean;
}