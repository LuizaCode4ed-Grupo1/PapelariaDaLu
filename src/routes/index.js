import express from 'express'
import RouterClientes from '../clientes/clientes-routes'

const router = express.Router()

router.use('/clientes', RouterClientes)

export default router