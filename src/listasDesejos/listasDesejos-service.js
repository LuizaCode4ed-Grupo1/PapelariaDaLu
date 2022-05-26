import mongoose from 'mongoose'
import config from '../config'

mongoose.connect(config.connectionString)


import ListaDesejos from './listasDesejos-model'

class ListaDesejosService {

    async cadastrarListaDesejos(idCliente, idProduto, nameList) {
        console.log('Inserindo uma lista de desejos no mongodb...')
        const novaListaDesejos = await new ListaDesejos({idCliente, idProduto, nameList})
        novaListaDesejos.save()
        return novaListaDesejos
    }

    listarListaDesejos(){
        return ListaDesejos.find()
    }

    listarListaDesejosPorId(_id) {
        const params = {}
        if (_id !== undefined && _id !== null) {
            params._id = _id
        }
        return ListaDesejos.find(params)
    }

}

export default ListaDesejosService