import express from 'express'

const router = express.Router()

import ListaDesejos from './listasDesejos-controller'
const listaDesejosController = new ListaDesejos()

// Cadastrar um novo cliente
router.post('/', (req, res, next) => {
    listaDesejosController.cadastrarListaDesejos(req.body)
    .then(listaDesejos => res.status(200).send(listaDesejos))
    .catch(next)
})