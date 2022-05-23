import ProdutoService from './produtos-service'

class ProdutoController {

    cadastrarProduto(produto) {
        console.log('Cadastrando um novo produto....', produto)
        const produtoService = new ProdutoService()
        return produtoService.cadastrarProduto(produto)
    }

    listarProdutos() {
        console.log('Exibindo produtos....')
        const produtoService = new ProdutoService()
        return produtoService.listarProdutos()
    }

}

export default ProdutoController