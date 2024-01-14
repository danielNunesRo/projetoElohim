const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
    name: String,
    serie: String
});

const Aluno = mongoose.model('aluno', alunoSchema);

module.exports = Aluno;