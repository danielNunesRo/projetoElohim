const Aluno = require('./models/aluno');
const Ocorrencia = require('./models/ocorrencias');

async function criarNovaOcorrencia(name, serie, description, data) {
    try {
        let alunoExiste = await Aluno.findOne({ name, serie });

        if (!alunoExiste) {
            const novoAluno = new Aluno({ name, serie });
            await novoAluno.save();
            alunoExiste = novoAluno;
        }

        const ocorrencia = new Ocorrencia({
            aluno: alunoExiste,
            description,
            data
        });

        const resultado = await ocorrencia.save();
        return resultado;
    } catch (error) {
        console.error('Erro ao criar uma nova ocorrência:', error);
        throw new Error('Erro ao criar uma nova ocorrência');
    }
}

async function obterTodasAsOcorrencias() {
    try {
        const ocorrencias = await Ocorrencia.find();
        return ocorrencias;
    } catch (error) {
        console.error('Erro ao obter todas as ocorrências:', error);
        throw new Error('Erro ao obter todas as ocorrências');
    }
}

module.exports = { criarNovaOcorrencia, obterTodasAsOcorrencias };