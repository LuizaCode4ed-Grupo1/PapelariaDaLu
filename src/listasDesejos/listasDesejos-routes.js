import express from 'express'

const router = express.Router()

import ListaDesejos from './listasDesejos-controller'
const listaDesejosController = new ListaDesejos()

// Cadastrar uma nova lista de desejos
router.post('/', (req, res) => {
    listaDesejosController.cadastrarListaDesejos(req, res)
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})

// Listar lista de desejos e busca paginada
router.get('/', (req, res, next) => {
    console.log(req.query)
    listaDesejosController.buscarPaginadoListaDesejos(req.query)
    .then(listaDesejos => res.status(200).send(listaDesejos))
    .catch(next)
})

// Buscar uma lista de desejos pelo id
router.get('/id/:_id', (req, res, next) => {
    listaDesejosController.listarListaDesejosPorId(req.params._id)
    .then(listaDesejos => res.status(200).send(listaDesejos))
    .catch(next)
})

// Buscar pelo IdCliente e retornar listas de desejos e produtos
router.get('/listasDesejos/:id', (req, res, next) => {
    listaDesejosController.listarIdClientesListaDesejosEProdutos(req.params.id)
    .then(listaDesejos => res.status(200).send(listaDesejos))
    .catch(next)
})

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
    listaDesejosController.removerListaDesejo(req, res)
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
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