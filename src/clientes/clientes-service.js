import mongoose from 'mongoose'
import config from '../config'

mongoose.connect(config.connectionString)


import Cliente from './clientes-model'
import ListaDesejosService from '../listasDesejos/listasDesejos-service'

class ClienteService {

    cadastrarCliente(cliente) {
        console.log('Inserindo novo cliente no mongodb...')
        const novoCliente = new Cliente(cliente)
        return novoCliente.save()
    }

    listarClientes(){
        return Cliente.find()
    }

    async listarClientesId(idCliente) {
        const params = {}
        const listaDesejosService = new ListaDesejosService()
        const populateListaDesejos = listaDesejosService.listarListaDesejosPorIdCliente(idCliente)//
        if (idCliente !== undefined && idCliente !== null) {
            params._id = idCliente
        }
        const clientes = await Cliente.findOne(params, (err, data) => {
            if (err) throw err;
            return JSON.stringify(data);

        })
        const listaDesejos = await populateListaDesejos //
        console.log(clientes[0], listaDesejos)
        const returnedValue = {...clientes, listaDesejos}
        return returnedValue

    }

    async listarClientesEListaDesejos(idCliente) {
        const params = {}
        const id = idCliente
        if (idCliente !== undefined && idCliente !== null) {
            params._id = idCliente
        }
        const cliente = await Cliente.findById(id)
        const wishlist = cliente.wishlists
        console.log(cliente)
        return wishlist
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