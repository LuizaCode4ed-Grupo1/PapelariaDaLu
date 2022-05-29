import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import config from '../config'

mongoose.connect(config.connectionString)

import Produto from './produtos-model'

class ProdutoService {

    cadastrarProduto(produto) {
        const novoProduto = new Produto(produto)
        return novoProduto.save()
    }

    async listarProdutosEListaDesejos(idProduto) {
        const params = {}
        const id = idProduto
        if (idProduto !== undefined && idProduto !== null) {
            params._id = idProduto
        }
        const produto = await Produto.findById(id).populate({path:'wishlists', select: '_id'})
        return produto
    }

    atualizarProduto(_id, produto) {
        return Produto.findOneAndUpdate({_id}, produto)
    }
    
    removerProduto(codigoProduto) {
        return Produto.findOneAndDelete({_id: codigoProduto})
    }

    buscarPaginadoProduto(query, pagina, limite) {

        if (pagina === undefined) {
           pagina = 1
        } 
        if (limite === undefined) {
            limite = 5
        }
        if (query.name) {
            query.name = new RegExp(query.name, 'i')
        }
        if (query._code) {
            query._code = new RegExp(query._code, 'y')
        }

        return Produto.paginate(query, { page: pagina, limit: limite })
    }


    async buscarProdutoPorId(idProduto) {
        if (!mongoose.Types.ObjectId.isValid(idProduto)) 
            return 'invalidIdProduto'
        try {
            const _id = new ObjectId(idProduto)
            return await Produto.find({_id})
        } catch (err) {
            return {'error': 'error on produtos-service'}
        }
    }
}

export default ProdutoService