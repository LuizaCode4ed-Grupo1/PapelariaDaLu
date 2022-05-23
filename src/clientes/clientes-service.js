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

    listarClientes(){
        return Cliente.find()
    }

    listarClientesId(idCliente) {
        const params = {}
        if (idCliente !== undefined && idCliente !== null) {
            params._id = idCliente
        }
        return Cliente.find(params)
    }

    listarClientesEmail(emailCliente) {
        const params = {}
        if (emailCliente !== undefined && emailCliente !==null) {
            params._email = emailCliente
        }
        return Cliente.find(params)
    }

    atualizarCliente(idCliente, cliente) {
        return Cliente.findOneAndUpdate({_id: idCliente}, cliente)
    }

    removerCliente(idCliente) {
        return Cliente.findOneAndDelete({_id: idCliente})
    }
}

export default ClienteService