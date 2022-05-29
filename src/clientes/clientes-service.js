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

    async listarClientesEListaDesejos(idCliente) {
        const params = {}
        const id = idCliente
        if (idCliente !== undefined && idCliente !== null) {
            params._id = idCliente
        }
        //const cliente = await Cliente.findById(id)
        const cliente = await Cliente.findById(id).populate({path:'wishlists', select: '_id'})
        // const wishlist = cliente.wishlists
        //console.log(cliente)
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
        console.log('Entrou no service')
        const resultado = Cliente.paginate(query, { page: pagina, limit: limite })
        return resultado
    }

    atualizarCliente(idCliente, cliente) {
        return Cliente.findOneAndUpdate({_id: idCliente}, cliente)
    }

    removerCliente(idCliente) {
        const removaCliente = Cliente.findOneAndDelete({_id: idCliente})
        return removaCliente
    }
}

export default ClienteService