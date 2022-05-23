import express from 'express'
import RouterClientes from '../clientes/clientes-routes'
import RouterProdutos from '../produtos/produtos-routes'

const router = express.Router()

router.use('/clientes', RouterClientes)
router.use('/produtos', RouterProdutos)

export default router