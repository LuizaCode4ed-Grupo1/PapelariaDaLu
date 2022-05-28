import express from 'express'

const router = express.Router()

import ProdutoController from './produtos-controller'
const produtoController = new ProdutoController()

/**
 * @swagger
 * components:
 *  schemas:
 *      Produto:
 *          type: object
 *          required:
 *              - name
 *              - description
 *              - _code
 *          properties:
 *              _id:
 *                  type: ObjectId
 *                  description: ID gerado automaticamente pelo MongoDB.
 *              name:
 *                  type: String
 *                  description: O nome do produto. Deve ser único.
 *                  uniqueItems: true
 *              description:
 *                  type: String
 *                  description: A descrição do produto.
 *              _code: 
 *                  type: String
 *                  description: O código do produto informado pelo usuário. Deve ser único.
 *                  uniqueItems: true
 *              price:
 *                  type: String
 *                  description: O preço do produto. Caso não informado, o default é 0.00.
 *              brand:
 *                  type: String
 *                  description: A marca do produto. Caso não informado, o default é a string "Não informado".
 *              color:
 *                  type: String
 *                  description: A cor principal do produto. Caso não informado, o default é a string "Não informado".
 *              wishlists:
 *                  type: array
 *                  description: Array que armazena os IDs das listas de desejos que contêm o produto.
 *                  items: 
 *                      type: ObjectId
 *                  uniqueItems: true
 *                  
 */

// Cadastrar um novo produto
// Status 201: Created
// Status 400: Bad Request
/**
 *  @swagger
 * /produtos:
 *   tags:
 *   - produtos
 *   post:
 *     description: Cadastra um novo produto
 *     responses:
 *       201:
 *         description: Produto cadastrado com sucesso.
 *       400:
 *         description: Bad Request
 */
router.post('/', (req, res) => {
    produtoController.cadastrarProduto(req.body)
    .then(produto => res.status(201).send(produto))
    .catch((err) => {
        res.status(400).json({ message: err.message })
    })
})

// Listar todos os produtos
// Status 200: OK
// Status 500 : Server Error
router.get('/', (req, res) => {
    produtoController.buscarPaginadoProduto(req.query)
    .then(produtos => 
        {
            if(produtos.docs.length === 0) {
                res.status(404).json({ message: 'Não encontramos nenhum produto com base nos parâmetros especificados.'})
            }
            else {
                res.status(200).send(produtos)
            }
        })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})

// Buscar pelo Produto e retornar listas de desejos
router.get('/listasDesejos/:id', (req, res, next) => {
    produtoController.listarProdutosEListaDesejos(req.params.id)
    .then(produto => res.status(200).send(produto))
    .catch(next)
})

// Atualizar um produto a partir do seu código
// Status 200: OK
// Status 400: Bad Request
router.patch('/:_code', verificarSeProdutoExiste, verificarSeClienteTentouAlterarCodigo, (req, res) => {
    produtoController.atualizarProduto(req.params._code, req.body)
    .then(produto => res.status(200).send(produto))
    .catch(err => {
        res.status(400).json({ message: err.message })
    })
})

// Remover um produto informando seu código
// Status 200: OK
// Status 400: Bad Request
router.delete('/:_code', verificarSeProdutoExiste, (req, res) => {
    produtoController.removerProduto(req.params._code)
    .then(produto => res.status(200).json({ message: 'Produto deletado com sucesso.' }))
    .catch(err => {
        res.status(400).json({ message: err.message })
    })
})

async function verificarSeProdutoExiste(req, res, next) {
    let produto
    try {
        produto = await produtoController.buscarProdutoPorCodigo(req.params._code)
        if (produto == null) {
            return res.status(404).json({ message: 'Não foi encontrado nenhum produto com o código especificado.' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    next()
}

async function verificarSeClienteTentouAlterarCodigo(req, res, next) {
    if(req.body._code) {
        if(req.params._code !== req.body._code) {
            return res.status(400).json({ message: 'Não é permitido alterar o código do produto!' })
        }
    }
    next()
}

export default router