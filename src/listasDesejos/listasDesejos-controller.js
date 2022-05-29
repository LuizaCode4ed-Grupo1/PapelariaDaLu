import ListaDesejosService from './listasDesejos-service'
import ProdutoService from '../produtos/produtos-service'

class listaDesejosController {

    cadastrarListaDesejos(idCliente, idProduto, nameList) {
        console.log('Cadastrando uma nova lista de desejos....', idCliente, idProduto, nameList)
        const listaDesejosService = new ListaDesejosService()
        return listaDesejosService.cadastrarListaDesejos(idCliente, idProduto, nameList)
    }

    listarListaDesejos(){
        console.log('Exibindo lista de desejos....')
        const listaDesejosService = new ListaDesejosService ()
        return listaDesejosService.listarListaDesejos()  
    }

    listarListaDesejosPorId(_id) {
        console.log('Exibindo Lista de Desejos por Id: ', _id)
        const listaDesejosService = new ListaDesejosService()
        return listaDesejosService.listarListaDesejosPorId(_id)
    }

    listarIdClientesListaDesejosEProdutos(idCliente) {
        const listaDesejosService = new ListaDesejosService()
        return listaDesejosService.listarIdClientesListaDesejosEProdutos(idCliente)
    }

    buscarPaginadoListaDesejos(params_query) {
        console.log('Entrou na busca paginada')
        let pagina = params_query.pagina
        let limite = params_query.limite

        if (!pagina) {
            pagina = 1
        } 
        if (!limite) {
            limite = 5
        }
        const listaDesejosService = new ListaDesejosService()
        return listaDesejosService.buscarPaginadoListaDesejos(params_query, pagina, limite)
    }

    atualizarListaDesejos(idListaDesejos, listaDesejos) {
        console.log('Atualizando lista de desejos: ', idListaDesejos)
        const listaDesejosService = new ListaDesejosService()
        return listaDesejosService.atualizarListaDesejos(idListaDesejos, listaDesejos)
    }

    removerListaDesejo(idListaDesejos) {
        console.log('Removendo a lista de desejo o id: ', idListaDesejos)
        const listaDesejosService = new ListaDesejosService()
        return listaDesejosService.removerListaDesejo(idListaDesejos)
    }    

    async adicionarProduto(req, res) {

        const idListaDesejos = req.params.idListaDesejos
        const idProduto = req.body.idProduto
        const listaDesejosService = new ListaDesejosService()
        const produtoService = new ProdutoService()

        // Validação de idListaDesejos - Verificar se idListaDesejos existe
        try {
            // Essa promise retorna um array de resultados. Se array retornar vazio é pq não encontrou nenhuma lista com os params especificados
            let wishlist = await listaDesejosService.listarListaDesejosPorId(idListaDesejos)
            if (wishlist.length === 0) {
                return res.status(404).json({ message: `Não foi encontrada nenhuma lista de desejos com o id informado: ${idListaDesejos}` })
            }
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }

        // Validação de idProduto - Verificar se idProduto existe
        try {
            let produto = await produtoService.buscarProdutoPorId(idProduto)
            // Por algum motivo essa validação não funcionou da mesma forma que a de isListaDesejos, mas está funcionando assim
            if (produto === 'invalidIdProduto' || produto.length === 0) {
                return res.status(400).json({ message: `O idProduto informado não é válido: ${idProduto}` })
            }
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }

        // TODO: Implementar validação de idProduto - Verificar se idProduto já está na lista informada
        try {
            let produto = await listaDesejosService.verificarSeListaJaContemProduto(idListaDesejos, idProduto)
            if (produto.length !== 0) {
                return res.status(400).json({ message: `A lista já contém o produto informado.` })
            }
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }

        // Depois de tudo validado:
        return listaDesejosService.adicionarProduto(idListaDesejos, idProduto)
    }
}


export default listaDesejosController
