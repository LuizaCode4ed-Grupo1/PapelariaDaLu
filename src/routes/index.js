import express from 'express'
import RouterClientes from '../clientes/clientes-routes'
import RouterProdutos from '../produtos/produtos-routes'
import RouterListaDesejos from '../listasDesejos/listasDesejos-routes'

const router = express.Router()

router.use('/clientes', RouterClientes)
router.use('/produtos', RouterProdutos)
router.use('/listaDesejos', RouterListaDesejos)

export default router