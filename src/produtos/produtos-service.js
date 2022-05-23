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

    listarProdutos() {
        return Produto.find()
    }
    
}

export default ProdutoService