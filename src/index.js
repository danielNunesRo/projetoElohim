const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { criarNovaOcorrencia, obterTodasAsOcorrencias } = require('./dataHandler.js');

const app = express();
const port = 3600;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://danielnunesro:<password>@ocorrencias.ycjx5my.mongodb.net/?retryWrites=true&w=majority');

const alunoSchema = new mongoose.Schema({
    name: String,
    serie: String

});

const ocorrenciaSchema = new mongoose.Schema({
    aluno: alunoSchema,
    description: String,
    data: Date
});

app.post('/ocorrencia', async (req, res) => {
    try {
        const { name, serie, description, data } = req.body;
        const resultado = await criarNovaOcorrencia(name, serie, description, data);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Erro ao criar uma nova ocorrência:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.get('/', async (req, res) => {
    try {
        const ocorrencias = await obterTodasAsOcorrencias();
        res.status(200).json(ocorrencias);
    } catch (error) {
        console.error('Erro ao obter todas as ocorrências:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;



