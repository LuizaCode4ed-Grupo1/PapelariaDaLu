import express from 'express'

const router = express.Router()

import ClienteController from './clientes-controller'
const clienteController = new ClienteController()

// Cadastrar um novo cliente
router.post('/', (req, res, next) => {
    clienteController.cadastrarCliente(req.body)
    .then(cliente => res.status(200).send(cliente))
    .catch(next)
})

// Listar todos os  clientes
router.get('/', (req, res, next) => {
    console.log(req.query.pagina)
    console.log(req.query.limite)
    clienteController.buscarPaginadoCliente(req.query.pagina, req.query.limite)
    .then(clientes => res.status(200).send(clientes))
    .catch(next)
})

// Listar cliente por id
router.get('/:_id', (req, res, next) => {
    clienteController.listarClientesId(req.params._id)
    .then(cliente => res.status(200).send(cliente))
    .catch(next)
})

// Listar cliente por email
router.get('/:email', (req, res, next) => {
    clienteController.listarClientesEmail(req.params.email)
    .then(cliente => res.status(200).send(cliente))
    .catch(next)
})

// Atualizar um cliente a partir do seu id
router.patch('/:_id', (req, res, next) => {
    clienteController.atualizarCliente(req.params._id, req.body)
    .then(cliente => res.status(200).send(cliente))
    .catch(next)
})

// Remover um cliente a partir do seu id
router.delete('/:_id', (req, res, next) => {
    clienteController.removerCliente(req.params._id)
    .then(cliente => res.status(200).send(cliente))
    .catch(next)
})

export default router