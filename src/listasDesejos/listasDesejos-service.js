import mongoose from 'mongoose'
import config from '../config'

mongoose.connect(config.connectionString)


import ListaDesejos from './listasDesejos-model'

class ListaDesejosService {

    cadastrarListaDesejos(listaDesejos) {
        console.log('Inserindo uma lista de desejos no mongodb...')
        const novaListaDesejos = new ListaDesejos(listaDesejos)
        return novaListaDesejos.save()
    }

}

export default ListaDesejosService