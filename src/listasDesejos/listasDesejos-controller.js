import ListaDesejosService from './listasDesejos-service'

class listaDesejosController {

    cadastrarListaDesejos(listaDesejos) {
        console.log('Cadastrando uma nova lista de desejos....', listaDesejos)
        const listaDesejosService = new ListaDesejosService()
        return listaDesejosService.cadastrarListaDesejos(listaDesejos)
    }

}

export default listaDesejosController