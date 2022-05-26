import mongoose from 'mongoose'
import config from '../config'

mongoose.connect(config.connectionString)


import ListaDesejosModel from './listasDesejos-model'
import Cliente from '../clientes/clientes-model'

class ListaDesejosService {

    async cadastrarListaDesejos(idCliente, idProduto, nameList) {
        console.log('Inserindo uma lista de desejos no mongodb...')

        const novaListaDesejos = await new ListaDesejosModel.ListaDesejos({idCliente, idProduto, nameList})

        // Inserindo a nova lista de desejos na coleção de lista de desejos
        console.log('Inserindo lista em listas')
        novaListaDesejos.save()

        // Inserindo a mesma lista de desejos dentro do documento do cliente 
        console.log('Inserindo lista em cliente')
        let cliente = await Cliente.findOneAndUpdate({ _id: idCliente }, { $push: {wishlists: novaListaDesejos}})
        console.log(cliente.wishlists)

        return novaListaDesejos
    }


    listarListaDesejos(_id) {
        const params = {}
        if (_id !== undefined && _id !== null) {
            params.code = _id
        }
        return ListaDesejosModel.ListaDesejos.find(params)
    }

}

export default ListaDesejosService