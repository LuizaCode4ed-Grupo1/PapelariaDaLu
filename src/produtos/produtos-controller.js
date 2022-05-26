import ProdutoService from './produtos-service'

class ProdutoController {

    cadastrarProduto(produto) {
        const produtoService = new ProdutoService()
        return produtoService.cadastrarProduto(produto)
    }

    atualizarProduto(codigoProduto, produto) {
        const produtoService = new ProdutoService()
        return produtoService.atualizarProduto(codigoProduto, produto)
    }

    removerProduto(codigoProduto) {
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