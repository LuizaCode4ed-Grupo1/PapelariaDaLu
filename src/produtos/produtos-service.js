import mongoose from 'mongoose'
import config from '../config'

mongoose.connect(config.connectionString)

import Produto from './produtos-model'

class ProdutoService {

    cadastrarProduto(produto) {
        console.log('Inserindo novo produto no mongodb....')
        const novoProduto = new Produto(produto)
        return novoProduto.save()
    }

    atualizarProduto(codigoProduto, produto) {
        return Produto.findOneAndUpdate({code: codigoProduto}, produto)
    }
    
    removerProduto(codigoProduto) {
        return Produto.findOneAndDelete({code: codigoProduto})
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

        return Produto.paginate(query, { page: pagina, limit: limite })
    }

    buscarProdutoPorCodigo(code) {
        return Produto.findOne({code})
    }

}

export default ProdutoService