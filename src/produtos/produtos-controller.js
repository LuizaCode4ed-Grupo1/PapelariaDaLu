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

    buscarPaginadoProduto(params_query) {
        
        let pagina = params_query.pagina
        let limite = params_query.limite

        if (!pagina) {
            pagina = 1
        } 
        if (!limite) {
            limite = 5
        }

        if (params_query.name) {
            params_query.name = new RegExp(params_query.name, 'i')
        }
        if (params_query.email) {
            params_query.email = new RegExp(params_query.email, 'i')
        }

        const produtoService = new ProdutoService()
        return produtoService.buscarPaginadoProduto(params_query, pagina, limite)
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
        let resultado = await produtoService.removerProduto(idProduto)
        return res.status(200).json({ message: `O Produto com codigo ${idProduto} foi deletado com sucesso!` })
    }

    async verificarSeProdutoEstaNaListaDesejos(idProduto) {
        const produtoService = new ProdutoService()

        let produto = await produtoService.buscarProdutoPorId(idProduto)
        .catch(err => { 
            console.error(err)
            return false
        })

        let arrayWishlists = produto[0].wishlists

        if(arrayWishlists.length === 0) {
            return false
        }
        return true

    }
}



export default ProdutoController