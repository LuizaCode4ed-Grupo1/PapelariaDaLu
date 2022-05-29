import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import config from '../config'

mongoose.connect(config.connectionString)


import Cliente from './clientes-model'

class ClienteService {

    cadastrarCliente(cliente) {
        const novoCliente = new Cliente(cliente)
        return novoCliente.save()
    }

    async listarClientes(idCliente){
        let idCliente2 = new ObjectId(idCliente)
        return await Cliente.find({ _id: idCliente2 })
    }

    listarClientesId(idCliente) {
        const params = {}
        if (idCliente !== undefined && idCliente !== null) {
            params._id = idCliente
        }
        return Cliente.find(params)
    }

    async listarClientesEListaDesejos(idCliente) {
        const params = {}
        const id = idCliente
        if (idCliente !== undefined && idCliente !== null) {
            params._id = idCliente
        }
        const cliente = await Cliente.findById(id).populate({path:'wishlists', select: '_id'})
        return cliente
    }

    listarClientesEmail(emailCliente) {
        const params = {}
        if (emailCliente !== undefined && emailCliente !==null) {
            params.email = emailCliente
        }
        return Cliente.find(params)
    }
    
    buscarPaginadoCliente(query, pagina, limite) {
        const resultado = Cliente.paginate(query, { page: pagina, limit: limite })
        return resultado
    }

    atualizarCliente(idCliente, cliente) {
        return Cliente.findOneAndUpdate({_id: idCliente}, cliente, { returnOriginal : false })
    }

    removerCliente(idCliente) {
        return Cliente.findOneAndDelete({_id: idCliente})
    }
}

export default ClienteService