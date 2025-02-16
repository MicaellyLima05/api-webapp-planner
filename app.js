import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import cors from "cors";

import express from "express";

const app = express();

const corsOptions = {
    origin: '*', //url de onde ta o front
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type'], 
};

app.use(cors(corsOptions));

app.use(express.json());

//faz anotação
app.post('/makenotes', async (req,res) => {
    
    await prisma.CONTEUDO.create({
        data: {
            dia:req.body.dia,
            texto:req.body.texto
        }
    })

    res.status(201).json( {message: "Texto gravado com sucessso"} );
})

//ler anotação
app.get('/shownotes', async (req,res) => {

    const texto = await prisma.CONTEUDO.findUnique({
        where: {
            dia: req.query.dia
        }
    });

    res.status(201).json(texto);
}) 

app.delete('/delnotes', async (req,res) => {

    await prisma.CONTEUDO.delete({
        where: {
            dia: req.body.dia
        }
    })

    res.status(200).json({message: "Anotação deletada"})
})

export default app;