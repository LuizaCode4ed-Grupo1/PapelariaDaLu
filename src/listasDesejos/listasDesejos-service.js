import mongoose from 'mongoose'
import config from '../config'

mongoose.connect(config.connectionString)

import ListaDesejos from './listasDesejos-model'
import Cliente from '../clientes/clientes-model'
import Produto from '../produtos/produtos-model'
import res from 'express/lib/response'

class ListaDesejosService {

    async cadastrarListaDesejos(idCliente, idProduto, nameList) {
        
        const novaListaDesejos = await new ListaDesejos({idCliente, idProduto, nameList})

        // Inserindo a nova lista de desejos na coleção de lista de desejos
        novaListaDesejos.save()

        // Inserindo o id desta lista de desejos dentro do documento do cliente
        let cliente = await Cliente.findOneAndUpdate({ _id: idCliente }, { $push: {wishlists: novaListaDesejos._id}})

        return novaListaDesejos
    }

    listarListaDesejos(){
        return ListaDesejos.find()
    }

    async listarListaDesejosPorId(_id) {
        const params = {}
        if (_id !== undefined && _id !== null) {
            params._id = _id
        }
        return await ListaDesejos.find(params)
    }

    async listarIdClientesListaDesejosEProdutos(idCliente) {
        const params = {}
        const id = idCliente
        if (idCliente !== undefined && idCliente !== null) {
            params._id = idCliente
        }
        const cliente = await Cliente.findById(id)
        const wishlist = cliente.wishlists
        console.log(wishlist)
        return wishlist
    }

    buscarPaginadoListaDesejos(query, pagina, limite) {
        console.log('Entrou no service')
        const resultado = ListaDesejos.paginate(query, { page: pagina, limit: limite })
        return resultado
    }

    atualizarListaDesejos(idListaDesejos, listaDesejos) {
        return ListaDesejos.findOneAndUpdate({_id: idListaDesejos},listaDesejos)
    }

    removerListaDesejo(idListaDesejos) {
        return ListaDesejos.findOneAndDelete({_id: idListaDesejos})
    }

    async adicionarProduto(idListaDesejos, idProduto) {
        await ListaDesejos.findOneAndUpdate({ _id: idListaDesejos }, { $push: { idProduto: idProduto }})
        return ListaDesejos.findById(idListaDesejos) 
    }

    async verificarSeListaJaContemProduto(idListaDesejos, idProduto) {
        return await ListaDesejos.find({
            _id: idListaDesejos,
            idProduto: idProduto
        })
    }

}

export default ListaDesejosService