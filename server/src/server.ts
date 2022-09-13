// 1 - Importing Express: antigamente se importava usando 'require'.
// const express = require('express');
// Atualmente, podemos importar indo no arquivo package.json e incluindo a linha "type": "module" e alterando a extensão do arquivo server.js para server.mjs (se formos trabalhar com TS, podemos usar apenas a extensão .ts). Dessa forma, podemos importar o express dessa forma:
import express from 'express';
import { PrismaClient } from '@prisma/client';

// Criando a aplicação
const app = express();

// conectando ao banco de dados
const prisma = new PrismaClient();

// get da lista de games
app.get('/games', async (req, res) => {
    // seleciona todos os jogos e conta quantos ads tem em cada
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });

    return res.json(games);
});

app.post('/ads', (req, res) => {
    return res.status(201).json([]);
});

// get dos anúncios por jogo
app.get('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id;

    // seleciona um jogo que tenha o mesmo id dos params da url, em ordem decrescente, e retorna todos os campos do banco de dados exceto o discord
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where: {
            gameId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    // tratando os dados de weekDays( no db está salvo como string, aqui criaremos um array com split)
    return res.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(',')
        };
    }));
});

// get do discord de acordo com o id do anúncio
app.get('/ads/:id/discord', async (req, res) => {
    const adId = req.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    });

    return res.json({
        discord: ad.discord
    });
});

app.listen(3333);