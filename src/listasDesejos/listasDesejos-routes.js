import express from 'express'

const router = express.Router()

import ListaDesejos from './listasDesejos-controller'
const listaDesejosController = new ListaDesejos()

/**
 * @swagger
 * components:
 *  schemas:
 *      ListasDesejos:
 *          type: object
 *          required:
 *              - nameList
 *              - idCliente
 *              - idProduto
 *          properties:
 *              _id:
 *                  type: ObjectId
 *                  description: ID gerado automaticamente pelo MongoDB
 *              idCliente:
 *                  type: ObjectId
 *                  description: O id do usuário
 *              idProduto:
 *                  type: array
 *                  description: Array que armazena os ids das listas de desejos do usuário
 *              createdAt: 
 *                  type: Date
 *                  description: O timestamp de quando a lista foi criada
 */


// Cadastrar uma nova lista de desejos
// Status 201: Created
// Status 500: Internal Server Error
/**
 *  @swagger
 * /listasDesejos:
 *   post:
 *     tags:
 *     - listasDesejos
 *     summary: Cadastra uma nova lista de desejos
 *     description: ""
 *     parameters:
 *      - in: body
 *        name: body
 *        description: O objeto "Lista de Desejos" a ser adicionado no banco de dados
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *              - nameList
 *              - idCliente
 *              - idProduto
 *              - createdAt
 *          properties:
 *              _id:
 *                  type: ObjectId
 *                  description: ID gerado automaticamente pelo MongoDB
 *              nameList:
 *                  type: string
 *                  description: O nome da lista de Desejos.
 *              idCliente:
 *                  type: ObjectId
 *                  description: O ID do cliente no MongoDB. Deve ser único.
 *                  uniqueItems: true 
 *              idProduto:
 *                  type: Array
 *                  description: O ID do produto no MongoDB.
 *                  items:
 *                      type: ObjectId
 *              createdAt:
 *                  type: date
 *                  description: Data de criação da lista de desejos. Caso não informado, o default é a date "Date.now".
 *              
 *     responses:
 *       201:
 *         description: Lista de desejos cadastrada com sucesso.
 *       500:
 *         description: Erro no servidor.
 */
router.post('/', (req, res) => {
    listaDesejosController.cadastrarListaDesejos(req, res)
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})

// Listar lista de desejos e busca paginada
// Status 200: OK
// Status 500 : Server Error
/**
 * @swagger
 * /listasDesejos:
 *   get:
 *     tags:
 *     - listasDesejos
 *     summary: Mostra todas as listas de desejos de forma paginada
 *     description: O cliente pode especificar a página e o número de itens por página a ser retornado. Exemplo, "localhost:3000/listasDesejos/?pagina=2&limite=10"
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
 *         description: Operação realizada com sucesso.
 *       500:
 *         description: Erro no servidor.
 * 
 */
router.get('/', (req, res, next) => {
    console.log(req.query)
    listaDesejosController.buscarPaginadoListaDesejos(req.query)
    .then(listaDesejos => res.status(200).send(listaDesejos))
    .catch((err) => {
        res.status(500).json({ message: err.message })
    })
})

// Buscar uma lista de desejos pelo id
/**
 * @swagger
 * /listasDesejos/id/{idListasDesejos}:
 *   get:
 *     tags:
 *     - listasDesejos
 *     summary: Mostra uma lista de desejos com o id especificado
 *     description: ""
 *     parameters:
 *     - name: idListasDesejos
 *       in: path
 *       required: true
 *       description: Id da Lista de Desejos que se deseja visualizar
 *       type: string
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 */
router.get('/id/:_id', (req, res, next) => {
    listaDesejosController.listarListaDesejosPorId(req.params._id)
    .then(listaDesejos => res.status(200).send(listaDesejos))
    .catch(next)
})


// Buscar pelo IdCliente e retornar listas de desejos e produtos
/**
 * @swagger
 * /listasDesejos/listasDesejos/{idCliente}:
 *   get:
 *     tags:
 *     - listasDesejos
 *     summary: Mostra as listas de desejos com os seus produtos, a partir de um cliente especificado
 *     description: ""
 *     parameters:
 *     - name: idCliente
 *       in: path
 *       required: true
 *       description: Id do cliente que se deseja visualizar
 *       type: string
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 */
router.get('/listasDesejos/:id', (req, res, next) => {
    listaDesejosController.listarIdClientesListaDesejosEProdutos(req.params.id)
    .then(listaDesejos => res.status(200).send(listaDesejos))
    .catch(err => {
        res.status(400).json({ message: err.message })
    })
})

// Atualizar lista de desejos a partir do seu código
// Status 200: OK
// Status 400: Bad Request
/**
 * @swagger
 * /listasDesejos:
 *   patch:
 *     tags:
 *     - listasDesejos
 *     summary: Atualiza uma lista de desejos já cadastrada
 *     description: ""
 *     parameters:
 *     - name: body
 *       in: body
 *       description: Objeto que contém os pares de chave-valor a serem atualizados. O código da lista de desejos não pode ser alterado!
 *     responses:
 *       200:
 *         description: Operação realizada com sucesso.
 *       400:
 *         description: Bad Request || Não é permitido alterar o código do produto.
 */
router.patch('/:_id', verificarSeClienteTentouAlterarId, (req, res, next) => {
    listaDesejosController.atualizarListaDesejos(req.params._id, req.body)
    .then(listaDesejos => res.status(200).send(listaDesejos))
    .catch(next)
})

// Adicionar um produto em uma lista de desejos existente
router.post('/:idListaDesejos', (req, res) => {
    listaDesejosController.adicionarProduto(req, res)
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})

router.delete('/:_id', (req, res) => {
    // Se o usuário informar o código de um produto no corpo da requisição, entendemos que ele quer deletar esse produto da lista de desejos
    if(req.body.idProduto) {
        listaDesejosController.removerProdutoDaListaDesejo(req, res)
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    } else {
        // Caso contrário, entendemos que ele quer deletar a lista inteira
        listaDesejosController.removerListaDesejo(req, res)
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    }
})

async function verificarSeClienteTentouAlterarId(req, res, next) {
    if(req.body.idCliente) {
        if(req.params.idCliente !== req.body.idCliente) {
            return res.status(400).json({ message: 'Não é permitido alterar o id do cliente!' })
        }
    }
    next()
}

export default router;