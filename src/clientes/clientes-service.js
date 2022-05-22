import mongoose from 'mongoose'
import config from '../config'

mongoose.connect(config.connectionString)


import Cliente from './clientes-model'

class ClienteService {

    cadastrarCliente(cliente) {
        console.log('Inserindo novo cliente no mongodb...')
        const novoCliente = new Cliente(cliente)
        return novoCliente.save()
    }

}

export default ClienteService