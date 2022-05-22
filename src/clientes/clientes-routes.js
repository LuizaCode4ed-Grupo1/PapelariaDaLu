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

export default router