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

        // Inserindo o id desta lista de desejos dentro do documento de produto
        let produto = await Produto.findOneAndUpdate({ _id: idProduto }, { $push: {wishlists: novaListaDesejos._id}})

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

    async listarIdClientesListaDesejosEProdutos() {
        const produto = await ListaDesejos.find().populate({path:'idProduto', select: '_id'})
        return produto
    }

    buscarPaginadoListaDesejos(query, pagina, limite) {
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
        // Adicionando o idProduto no array idProduto[] da lista de desejos informada
        await ListaDesejos.findOneAndUpdate({ _id: idListaDesejos }, { $push: { idProduto: idProduto }})

        // Adicionando o idListaDesejos no array wishlists[] do produto informado
        await Produto.findOneAndUpdate({ _id: idProduto }, { $push: { wishlists: idListaDesejos } } )

        return await ListaDesejos.findById(idListaDesejos) 
    }

    async verificarSeListaJaContemProduto(idListaDesejos, idProduto) {
        return await ListaDesejos.find({
            _id: idListaDesejos,
            idProduto: idProduto
        })
    }

}

export default ListaDesejosService