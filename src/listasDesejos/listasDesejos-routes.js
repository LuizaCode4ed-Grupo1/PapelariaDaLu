import express from 'express'

const router = express.Router()

import ListaDesejos from './listasDesejos-controller'
const listaDesejosController = new ListaDesejos()

// Cadastrar uma nova lista de desejos
router.post('/', (req, res, next) => {
    listaDesejosController.cadastrarListaDesejos(req.body.idCliente, req.body.idProduto, req.body.nameList)
    .then(listaDesejos => listaDesejos)
    .catch(next())
    return res.status(200).send({ok: true})
})

// Listar lista de desejos
router.get('/', (req, res, next) => {
    listaDesejosController.listarListaDesejos()
    .then(listaDesejos => res.status(200).send(listaDesejos))
    .catch(next)
})

// Buscar uma lista de desejos pelo id
router.get('/id/:_id', (req, res, next) => {
    listaDesejosController.listarListaDesejosPorId(req.params._id)
    .then(listaDesejos => res.status(200).send(listaDesejos))
    .catch(next)
})

export default router;