import * as mongoose from 'mongoose';

export const ColaboradorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cargo: { type: String, required: true },
    admissao: { type: Date, required: true },
    active: { type: Boolean },
});

export interface Colaborador {
    id: string;
    name: string;
    cargo: string;
    admissao: Date;
    active: boolean;
}