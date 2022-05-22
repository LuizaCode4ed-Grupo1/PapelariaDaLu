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

// Listar cliente
router.get('/', (req, res, next) => {
    clienteController.listarClientes()
    .then(clientes => res.status(200).send(clientes))
    .catch(next)
})

// Listar cliente por id
router.get('/:_id', (req, res, next) => {
    clienteController.listarClientesId(req.params._id)
    .then(clientes => res.status(200).send(clientes))
    .catch(next)
})

export default router