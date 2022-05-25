import ProdutoService from './produtos-service'

class ProdutoController {

    cadastrarProduto(produto) {
        console.log('Cadastrando um novo produto...', produto)
        const produtoService = new ProdutoService()
        return produtoService.cadastrarProduto(produto)
    }

    atualizarProduto(codigoProduto, produto) {
        console.log('Atualizando o produto com o código: ', codigoProduto)
        const produtoService = new ProdutoService()
        return produtoService.atualizarProduto(codigoProduto, produto)
    }

    removerProduto(codigoProduto) {
        console.log('Removendo o produto com o código: ', codigoProduto)
        const produtoService = new ProdutoService()
        return produtoService.removerProduto(codigoProduto)
    }

    buscarPaginadoProduto(query) {
        const produtoService = new ProdutoService()
        return produtoService.buscarPaginadoProduto(query)
    }

    buscarProdutoPorCodigo(codigo) {
        const produtoService = new ProdutoService()
        return produtoService.buscarProdutoPorCodigo(codigo)
    }
}

export default ProdutoController