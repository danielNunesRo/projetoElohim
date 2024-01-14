const mongoose = require('mongoose');
const Aluno = require('./aluno');

const ocorrenciaSchema = new mongoose.Schema({
    aluno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'aluno'
    },
    description: String,
    data: Date
});

const Ocorrencia = mongoose.model('ocorrencia', ocorrenciaSchema);

module.exports = Ocorrencia;