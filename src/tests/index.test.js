const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');

describe('Testes para rotas Express', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://danielnunesro:<password>@ocorrencias.ycjx5my.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('Deve criar uma nova ocorrência via rota POST', async () => {
        const response = await request(app)
            .post('/ocorrencia')
            .send({ name: 'Teste', serie: 'SerieTeste', description: 'Descrição teste', data: new Date() });

        expect(response.status).toBe(201);
        expect(response.body).toBeDefined();
        expect(response.body.aluno.name).toBe('Teste');
    });

    test('Deve obter todas as ocorrências via rota GET', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toBeInstanceOf(Array);
    });
});