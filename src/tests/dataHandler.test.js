const mongoose = require('mongoose');
const { criarNovaOcorrencia, obterTodasAsOcorrencias } = require('../dataHandler');
const Aluno = require('../models/aluno');
const Ocorrencia = require('../models/ocorrencias');

describe('Testes para manipulação de dados', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://danielnunesro:<password>@ocorrencias.ycjx5my.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('Deve criar uma nova ocorrência', async () => {
        const resultado = await criarNovaOcorrencia('Teste', 'SerieTeste', 'Descrição teste', new Date());
        expect(resultado).toBeDefined();
        expect(resultado.aluno.name).toBe('Teste');
    });

    test('Deve obter todas as ocorrências', async () => {
        const ocorrencias = await obterTodasAsOcorrencias();
        expect(ocorrencias).toBeDefined();
        expect(ocorrencias).toBeInstanceOf(Array);
    });
});