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

    listarClientesId2(idCliente) {
        const params = {}
        if (idCliente !== undefined && idCliente !== null) {
            params._id = idCliente
        }
        // return Cliente.aggregate([
        // {
        //     "$unwind": "$wishlists" 
        // },
        // {
        //     "$group": {
        //         "_id": null,
        //         "allwishlists": {
        //             "$addToSet": "$wishlists"
        //         }
        //     }
        // }])

        return Cliente.find(params).populate('wishlists')
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

         if (pagina === undefined) {
            pagina = 1
        } 
         if (limite === undefined) {
             limite = 5
        }
         if (query.name) {
            query.name = new RegExp(query.name, 'i')
        }
        
        var resultado = Cliente.paginate(query, { page: pagina, limit: limite }, this.callbackBuscaCliente)
        
        return resultado
    }

    callbackBuscaCliente(erro, resultado) {
        // console.log('Executando callback')
        // console.log(erro)
        // console.log(resultado)
    }

    atualizarCliente(idCliente, cliente) {
        return Cliente.findOneAndUpdate({_id: idCliente}, cliente)
    }

    removerCliente(idCliente) {
        return Cliente.findOneAndDelete({_id: idCliente})
    }
}

export default ClienteService