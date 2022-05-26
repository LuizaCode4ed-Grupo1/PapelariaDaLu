import mongoose from 'mongoose'
import config from '../config'

mongoose.connect(config.connectionString)

import Produto from './produtos-model'

class ProdutoService {

    cadastrarProduto(produto) {
        const novoProduto = new Produto(produto)
        return novoProduto.save()
    }

    atualizarProduto(codigoProduto, produto) {
        return Produto.findOneAndUpdate({_code: codigoProduto}, produto)
    }
    
    removerProduto(codigoProduto) {
        return Produto.findOneAndDelete({_code: codigoProduto})
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

    buscarProdutoPorCodigo(_code) {
        return Produto.findOne({_code})
    }

}

export default ProdutoService