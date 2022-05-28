import ListaDesejosService from './listasDesejos-service'

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
        var pagina = params_query.pagina
        var limite = params_query.limite

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

}

export default listaDesejosController
