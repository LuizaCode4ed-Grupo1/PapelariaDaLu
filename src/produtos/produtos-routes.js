import express from 'express'

const router = express.Router()

import ProdutoController from './produtos-controller'
const produtoController = new ProdutoController()

// Cadastrar um novo produto
router.post('/', (req, res, next) => {
    produtoController.cadastrarProduto(req.body)
    .then(produto => res.status(200).send(produto))
    .catch(next)
})

// Listar todos os produtos
router.get('/', (req, res, next) => {
    produtoController.listarProdutos()
    .then(produtos => res.status(200).send(produtos))
    .catch(next)
})

// Buscar um produto pelo seu código
router.get('/:code', (req, res, next) => {
    produtoController.listarProdutoPorCodigo(req.params.code)
    .then(produto => res.status(200).send(produto))
    .catch(next)
})

// Atualizar um produto a partir do seu código
router.patch('/:code', (req, res, next) => {
    produtoController.atualizarProduto(req.params.code, req.body)
    .then(produto => res.status(200).send(produto))
    .catch(next)
})

export default router