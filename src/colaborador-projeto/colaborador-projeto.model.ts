import * as mongoose from 'mongoose';

export const ColaboradorProjetoSchema = new mongoose.Schema({
    ProjetoId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projeto' }],
    ColaboradorId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Colaborador' }],
    inicio: { type: Date },
    fim: { type: Date },
});

var ColaboradorProjeto = mongoose.model('ColaboradorProjeto', ColaboradorProjetoSchema);

export interface ColaboradorProjeto {
  id: string;
  ProjetoId: string;
  ColaboradorId: string;
  inicio: Date;
  fim: Date;
}