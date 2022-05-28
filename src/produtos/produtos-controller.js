import ProdutoService from './produtos-service'

class ProdutoController {

    cadastrarProduto(produto) {
        const produtoService = new ProdutoService()
        return produtoService.cadastrarProduto(produto)
    }

    listarProdutosEListaDesejos(idProduto) {
        const produtoService = new ProdutoService()
        return produtoService.listarProdutosEListaDesejos(idProduto)
    }

    atualizarProduto(codigoProduto, produto) {
        const produtoService = new ProdutoService()
        return produtoService.atualizarProduto(codigoProduto, produto)
    }

    removerProduto(codigoProduto) {
        const produtoService = new ProdutoService()
        return produtoService.removerProduto(codigoProduto)
    }

    listarProdutosId(idProduto) {
        const clienteService = new ProdutoService()
        return clienteService.listarProdutosId(idProduto)
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