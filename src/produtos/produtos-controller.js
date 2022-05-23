import ProdutoService from './produtos-service'

class ProdutoController {

    cadastrarProduto(produto) {
        console.log('Cadastrando um novo produto...', produto)
        const produtoService = new ProdutoService()
        return produtoService.cadastrarProduto(produto)
    }

    listarProdutos() {
        console.log('Exibindo produtos...')
        const produtoService = new ProdutoService()
        return produtoService.listarProdutos()
    }

    listarProdutoPorCodigo(codigoProduto) {
        console.log('Procurando produto com o código: ', codigoProduto)
        const produtoService = new ProdutoService()
        return produtoService.listarProdutos(codigoProduto)
    }

    atualizarProduto(codigoProduto, produto) {
        console.log('Atualizando o produto com o código: ', codigoProduto)
        const produtoService = new ProdutoService()
        return produtoService.atualizarProduto(codigoProduto, produto)
    }

}

export default ProdutoController