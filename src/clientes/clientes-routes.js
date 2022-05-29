import express from 'express'

const router = express.Router()

import ClienteController from './clientes-controller'
const clienteController = new ClienteController()

/**
 * @swagger
 * components:
 *  schemas:
 *      Cliente:
 *          type: object
 *          required:
 *              - name
 *              - email
 *              - birthday
 *              - cpf
 *          properties:
 *              _id:
 *                  type: ObjectId
 *                  description: ID gerado automaticamente pelo MongoDB
 *              name:
 *                  type: String
 *                  description: O nome do usuário
 *              email:
 *                  type: String
 *                  description: O email do usuário
 *              birthday: 
 *                  type: Date
 *                  description: A data de nascimento do usuário. Deve ser informado no método POST no formato americano (MM/DD/YYYY)
 *              cpf:
 *                  type: String
 *                  description: O CPF do usuário
 *              phoneNumber:
 *                  type: Number
 *                  description: O número de telefone do usuário
 *              wishlists:
 *                 type: array
 *                 description: Array que armazena os IDs das listas de desejos do usuário
 *                 items:
 *                   type: objectId
 *                   uniqueItems: true
 */

/**
 *  @swagger
 * /clientes:
 *   post:
 *     tags:
 *     - clientes
 *     summary: Cadastra um novo cliente
 *     description: ""
 *     parameters:
 *     - in: body
 *       name: body
 *       description: O objeto "Cliente" a ser adicionado ao banco de dados.
 *       required: true
 *       schema:
 *         type: object
 *         required:
 *         - name
 *         - email
 *         - birthday
 *         - cpf
 *         properties:
 *             _id:
 *                 type: objectId
 *                 description: ID gerado automaticamente pelo MongoDB
 *             name:
 *                 type: string
 *                 description: O nome do usuário
 *             email:
 *                 type: string
 *                 description: O email do usuário
 *             birthday: 
 *                 type: date
 *                 description: A data de nascimento do usuário. Deve ser informado no método POST no formato americano (MM/DD/YYYY)
 *             cpf:
 *                 type: string
 *                 description: O CPF do usuário
 *             phoneNumber:
 *                 type: number
 *                 description: O número de telefone do usuário
 *             wishlists:
 *                 type: array
 *                 description: Array que armazena os IDs das listas de desejos do usuário
 *                 items:
 *                   type: objectId
 *                   uniqueItems: true
 *     responses:
 *       200:
 *         description: Cliente cadastrado com sucesso
 *       400:
 *         description: Bad Request
 */
router.post('/', verificarSeClienteTentouCadastrarComWishlist, (req, res, next) => {
    clienteController.cadastrarCliente(req.body)
    .then(cliente => res.status(201).send(cliente))
    .catch((err) => {
        res.status(400).json({ message: err.message })
    })
})

/**
 * @swagger
 * /clientes:
 *   get:
 *     tags:
 *     - clientes
 *     summary: Mostra todos os clientes de forma paginada
 *     description: O cliente pode especificar a página e o número de itens por página a ser retornado. Exemplo, "localhost:3000/clientes/?pagina=2&limite=10"
 *     parameters:
 *     - name: pagina
 *       in: query
 *       description: Parâmetro opcional que indica a página a ser retornada. Caso não informado, o valor default é 1 (a primeira página de resultados).
 *       type: integer
 *     - name: limite
 *       in: query
 *       description: Parâmetro opcional que indica o número de resultados por página. Caso não informado, o valor default é 5.
 *       type: integer
 *     responses:
 *       200:
 *         description: Operação realizada com sucesso
 *       500:
 *         description: Erro no servidor  
 */
router.get('/', (req, res, next) => {
    console.log(req.query)
    clienteController.buscarPaginadoCliente(req.query)
    .then(clientes => res.status(200).send(clientes))
    .catch((err) => {
        res.status(500).json({ message: err.message })
    })
})

/**
 * @swagger
 * /clientes/id/{idCliente}:
 *   get:
 *     tags:
 *     - clientes
 *     summary: Mostra um cliente com o id especificado
 *     description: ""
 *     parameters:
 *     - name: idCliente
 *       in: path
 *       required: true
 *       description: Id do cliente que se deseja visualizar
 *       type: string
 *     responses:
 *       200:
 *         description: Operação realizada com sucesso
 *       400:
 *         description: Bad Request
 */
router.get('/id/:id', (req, res, next) => {
    clienteController.listarClientesId(req.params.id)
    .then(cliente => res.status(200).send(cliente))
    .catch(err => {
        res.status(400).json({ message: err.message })
    })
})

/**
 * @swagger
 * /clientes/listasDesejos/{idCliente}:
 *   get:
 *     tags:
 *     - clientes
 *     summary: Mostra as listas de desejos de um cliente especificado
 *     description: ""
 *     parameters:
 *     - name: idCliente
 *       in: path
 *       required: true
 *       description: Id do cliente que se deseja visualizar
 *       type: string
 *     responses:
 *       200:
 *         description: Operação realizada com sucesso
 *       400:
 *         description: Bad Request
 */
router.get('/listasDesejos/:id', (req, res, next) => {
    clienteController.listarClientesEListaDesejos(req.params.id)
    .then(cliente => res.status(200).send(cliente))
    .catch(err => {
        res.status(400).json({ message: err.message })
    })
})

/**
 * @swagger
 * /clientes/email/{emailCliente}:
 *   get:
 *     tags: 
 *     - clientes
 *     summary: Mostra um cliente com o email especificado
 *     description: ""
 *     responses:
 *       200:
 *         description: Operação realizada com sucesso
 */
router.get('/email/:email', (req, res, next) => {
    clienteController.listarClientesEmail(req.params.email)
    .then(cliente => res.status(200).send(cliente))
    .catch(next)
})

/**
 * @swagger
 * /clientes:
 *   patch:
 *     tags:
 *     - clientes
 *     summary: Atualiza um cliente já cadastrado
 *     description: ""
 *     parameters:
 *     - name: idCliente
 *       in: path
 *       required: true
 *       description: Id do cliente a ser atualizado
 *       type: string
 *     responses:
 *       200:
 *         description: Operação realizada com sucesso
 *       500: 
 *         description: Erro no servidor
 */
router.patch('/:_id', (req, res, next) => {
    clienteController.atualizarCliente(req.params._id, req.body)
    .then(cliente => res.status(200).send(cliente))
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})

/**
 * @swagger
 * /clientes:
 *   delete:
 *     tags:
 *     - clientes
 *     summary: Remove um cliente a partir do seu id
 *     description: ""
 *     responses:
 *       204:
 *         description: Cliente deletado com sucesso
 */
router.delete('/:_id', (req, res) => {
    clienteController.removerCliente(req, res)
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})

async function verificarSeClienteTentouCadastrarComWishlist(req, res, next) {
    if(req.body.wishlists) {
        return res.status(400).json({ message: 'Bad Request. Não é permitido cadastrar um cliente com listas de desejos.'})
    }
    next()
}

export default router