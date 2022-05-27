import express from 'express'

const router = express.Router()

import ListaDesejos from './listasDesejos-controller'
const listaDesejosController = new ListaDesejos()

// Cadastrar uma nova lista de desejos
router.post('/', (req, res, next) => {
    listaDesejosController.cadastrarListaDesejos(req.body.idCliente, req.body.idProduto, req.body.nameList)
    .then(listaDesejos => listaDesejos)
    .catch(next())
    return res.status(200).send({ok: true})
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

router.patch('/:_id', verificarSeClienteTentouAlterarId, (req, res, next) => {
    listaDesejosController.atualizarListaDesejos(req.params._id, req.body)
    .then(listaDesejos => res.status(200).send(listaDesejos))
    .catch(next)
})


async function verificarSeClienteTentouAlterarId(req, res, next) {
    if(req.body.idCliente) {
        if(req.params.idCliente !== req.body.idCliente) {
            return res.status(400).json({ message: 'Não é permitido alterar o id do cliente!' })
        }
    }
    next()
}

router.delete('/:_id', (req, res, next) => {
    listaDesejosController.removerListaDesejo(req.params._id)
    .then(listaDesejos => res.status(200).send(listaDesejos))
    .catch(next)
})

export default router;