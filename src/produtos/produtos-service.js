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

    listarProdutos(codigoProduto) {
        const params = {}
        if (codigoProduto !== undefined && codigoProduto !== null) {
            params.code = codigoProduto
        }
        return Produto.find(params)
    }

    atualizarProduto(codigoProduto, produto) {
        return Produto.findOneAndUpdate({code: codigoProduto}, produto)
    }
    
    removerProduto(codigoProduto) {
        return Produto.findOneAndDelete({code: codigoProduto})
    }

    buscarPaginado(pagina, limite) {
        if (pagina === undefined) {
           pagina = 1
        } 
        if (limite === undefined) {
            limite = 5
        }
        return Produto.paginate({}, { page: pagina, limit: limite }, function (err, result) {})
    }

}

export default ProdutoService