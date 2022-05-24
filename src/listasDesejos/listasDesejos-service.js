import mongoose from 'mongoose'
import config from '../config'

mongoose.connect(config.connectionString)


import ListaDesejos from './listasDesejos-model'

class ListaDesejosService {

    cadastrarListaDesejos(idCliente, idProduto) {
        console.log('Inserindo uma lista de desejos no mongodb...')
        const novaListaDesejos = new ListaDesejos({idCliente: idCliente, idProduto: idProduto})
        return novaListaDesejos.save()
    }


    listarListaDesejos(_id) {
        const params = {}
        if (_id !== undefined && _id !== null) {
            params.code = _id
        }
        return ListaDesejos.find(params)
    }

}

export default ListaDesejosService