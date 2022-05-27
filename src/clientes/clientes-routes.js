import express from 'express'

const router = express.Router()

import ClienteController from './clientes-controller'
const clienteController = new ClienteController()


/**
 *  @swagger
 * /clientes:
 *   post:
 *     description: Cadastra um novo cliente
 *     responses:
 *       200:
 *         description: Sucesso ao cadastrar novo cliente!
 */
router.post('/', (req, res, next) => {
    clienteController.cadastrarCliente(req.body)
    .then(cliente => res.status(200).send(cliente))
    .catch(next)
})

/**
 * @swagger
 * /clientes:
 *   get:
 *     description: Lista todos os clientes.
 *     responses:
 *       200:
 *         description: Sucesso ao encontrar todos os clientes!
 */
router.get('/', (req, res, next) => {
    console.log(req.query)
    clienteController.buscarPaginadoCliente(req.query)
    .then(clientes => res.status(200).send(clientes))
    .catch(next)
})


/**
 * @swagger
 * /cliente/id:
 *   get:
 *     description: Lista cliente por id
 *     responses:
 *       200:
 *         description: Sucesso ao encontrar cliente!
 */

router.get('/id/:id', (req, res, next) => {
    clienteController.listarClientesId(req.params.id)
    .then(cliente => res.status(200).send(cliente))
    .catch(next)
})

// Buscar pelo idCliente e retornar listas de desejos
router.get('/listasDesejos/:id', (req, res, next) => {
    clienteController.listarClientesEListaDesejos(req.params.id)
    .then(cliente => res.status(200).send(cliente))
    .catch(next)
})

/**
 * @swagger
 * /cliente/email:
 *   get:
 *     description: Lista cliente por email
 *     responses:
 *       200:
 *         description: Sucesso ao encontrar cliente!
 */

router.get('/email/:email', (req, res, next) => {
    clienteController.listarClientesEmail(req.params.email)
    .then(cliente => res.status(200).send(cliente))
    .catch(next)
})

/**
 * @swagger
 * /cliente:
 *   patch:
 *     description: Atualiza um cliente pelo id
 *     responses:
 *       200:
 *         description: Sucesso ao encontrar cliente!
 */

router.patch('/:_id', (req, res, next) => {
    clienteController.atualizarCliente(req.params._id, req.body)
    .then(cliente => res.status(200).send(cliente))
    .catch(next)
})

/**
 * @swagger
 * /cliente:
 *   delete:
 *     description: Remove um cliente a partir do seu id
 *     responses:
 *       200:
 *         description: Sucesso ao encontrar cliente!
 */


router.delete('/:_id', (req, res, next) => {
    clienteController.removerCliente(req.params._id)
    .then(cliente => res.status(200).send(cliente))
    .catch(next)
})

export default router