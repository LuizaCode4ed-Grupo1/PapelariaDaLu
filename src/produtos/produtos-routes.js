import express from 'express'

const router = express.Router()

import ProdutoController from './produtos-controller'
const produtoController = new ProdutoController()

// Cadastrar um novo produto
// Status 201: Created
// Status 400: Bad Request
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