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

    buscarPaginadoProduto(query) {
        const produtoService = new ProdutoService()
        return produtoService.buscarPaginadoProduto(query)
    }

    buscarProdutoPorId(idProduto) {
        const produtoService = new ProdutoService()
        return produtoService.buscarProdutoPorId(idProduto)
    }

   async removerProduto(req, res) {
        let idProduto = req.params.id

        // TODO: Verificar se Produto possui wishlists
        let checkListasProdutos = await this.verificarSeProdutoEstaNaListaDesejos(idProduto)
        if (checkListasProdutos) {
            return res.status(400).json({ message: `O produto com id ${idProduto} não pode ser removido porque ele está inserido em uma lista de desejos.` })
        }
    
        //TODO: Remove Produto pelo id
        const produtoService = new ProdutoService()
        let resultado = produtoService.removerProduto(idProduto)
        return res.status(200).json({ message: `O Produto com codigo ${idProduto} foi deletado com suceso` })
    }

    async verificarSeProdutoEstaNaListaDesejos(idProduto) {
        const produtoService = new ProdutoService()

        let produto = await produtoService.buscarProdutoPorId(idProduto)
        .catch(err => { 
            console.log(err)
            return false
        })

        //console.log(produto[0].wishlists)
        let arrayWishlists = produto[0].wishlists
        //console.log(arrayWishlists.length)

        if(arrayWishlists.length === 0) {
            return false
        }
        return true

    }
}



export default ProdutoController