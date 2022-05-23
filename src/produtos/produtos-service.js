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
    
}

export default ProdutoService