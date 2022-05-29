import ListaDesejosService from './listasDesejos-service'
import ProdutoService from '../produtos/produtos-service'
import { ObjectId } from 'mongodb'

class listaDesejosController {

    async cadastrarListaDesejos(req, res) {

        const idCliente = req.body.idCliente
        const idProduto = req.body.idProduto
        const nameList = req.body.nameList

        if (!idCliente || !idProduto || !nameList) {
            return res.status(400).json({ message: 'Para cadastrar uma nova lista é necessário informar idCliente, idProduto e nameList' })
        }

        // TODO : Verificar se cliente existe

        // Verificar se produto existe
        let checkProduto = await this.verificarSeProdutoExiste(idProduto)
        if (!checkProduto) {
            return res.status(400).json({ message: `O idProduto informado não é válido: ${idProduto}` })
        }

        const listaDesejosService = new ListaDesejosService()
        const resultado = await listaDesejosService.cadastrarListaDesejos(idCliente, idProduto, nameList)
        return res.status(201).send(resultado)

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

    async removerListaDesejo(req, res) {
        const idListaDesejos = req.params._id
        
        if (!idListaDesejos) {
            return res.status(400).json({ message: 'Para deletar uma lista de desejos é necessário informar seu id na URL' })
        }

        // TODO : Verificar se lista existe
        let checkLista = await this.verificarSeListaExiste(idListaDesejos)
        if (!checkLista) {
            return res.status(400).json({ message: `O idListaDesejos informado não é válido: ${idListaDesejos}` })
        }

        const listaDesejosService = new ListaDesejosService()
        const resultado = await listaDesejosService.removerListaDesejo(idListaDesejos)
        return res.status(200).json({ message: `Lista com id ${idListaDesejos} deletada com sucesso.` })
    }    

    async adicionarProduto(req, res) {

        const idListaDesejos = req.params.idListaDesejos
        const idProduto = req.body.idProduto
        const listaDesejosService = new ListaDesejosService()
        
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
        let checkProduto = await this.verificarSeProdutoExiste(idProduto)
        if (!checkProduto) {
            return res.status(400).json({ message: `O idProduto informado não é válido: ${idProduto}` })
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

    /**
     * Verifica se um idProduto existe atualmente no banco de dados, retornando true caso exista e false caso contrário.
     * @param {ObjectId} idProduto 
     * @returns {Promise<Boolean>}
     */
    async verificarSeProdutoExiste(idProduto) {
        const produtoService = new ProdutoService()
        try {
            let produto = await produtoService.buscarProdutoPorId(idProduto)
            if (produto === 'invalidIdProduto' || produto.length === 0) {
                return false
            } else {
                return true
            }
        } catch(err) {
            console.log(err.message)
            return false
        }
    }

    /**
     * Verifica se um idListaDesejos existe atualmente no banco de dados, retornando true caso exista e false caso contrário.
     * @param {ObjectId} idListaDesejos 
     * @returns {Promise<Boolean>}
     */
    async verificarSeListaExiste(idListaDesejos) {
        const listaDesejosService = new ListaDesejosService()
        try {
            let lista = await listaDesejosService.listarListaDesejosPorId(idListaDesejos)
            if (lista.length === 0) {
                return false
            } else {
                return true
            }
        } catch(err) {
            console.log(err.message)
            return false
        }
    }
}


export default listaDesejosController
