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

}

export default listaDesejosController
