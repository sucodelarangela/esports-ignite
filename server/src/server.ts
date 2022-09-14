// 1 - Importing Express: antigamente se importava usando 'require'.
// const express = require('express');
// Atualmente, podemos importar indo no arquivo package.json e incluindo a linha "type": "module" e alterando a extensão do arquivo server.js para server.mjs (se formos trabalhar com TS, podemos usar apenas a extensão .ts). Dessa forma, podemos importar o express dessa forma:
import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';

// Criando a aplicação
const app = express();

app.use(express.json());

// cors protege a aplicação contra front ends que não queremos que acessem nosso back-end
// sem parâmetros, qualquer front end pode acessar nosso back-end
app.use(cors());

// em produção, o correto é designar qual o front que fará uso do back
/*
app.use(cors({
    origin: 'http://rocketseat.com.br'
}))
*/

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

// criando um novo anúncio
app.post('/games/:gameId/ads', async (req, res) => {
    const gameId = req.params.gameId;

    const body = req.body;

    // hourStart e hourEnd vem em string. Envolvemos ela na função (na pasta utils) que converte esses valores para minutos
    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    });

    return res.status(201).json(ad);
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
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd)
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