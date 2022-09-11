// 1 - Importing Express: antigamente se importava usando 'require'.
// const express = require('express');
// Atualmente, podemos importar indo no arquivo package.json e incluindo a linha "type": "module" e alterando a extensão do arquivo server.js para server.mjs (se formos trabalhar com TS, podemos usar apenas a extensão .ts). Dessa forma, podemos importar o express dessa forma:
import express from 'express';

// Criando a aplicação
const app = express();

// Criando a primeira rota
app.get('/ads', (req, res) => {
    return res.json([
        { id: 1, name: 'Anúncio 1' },
        { id: 2, name: 'Anúncio 2' },
        { id: 3, name: 'Anúncio 3' },
        { id: 4, name: 'Anúncio 4' }
    ]);
});

app.listen(3333);