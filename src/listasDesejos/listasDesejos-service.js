import mongoose from 'mongoose'
import config from '../config'

mongoose.connect(config.connectionString)

import ListaDesejos from './listasDesejos-model'
import Cliente from '../clientes/clientes-model'

class ListaDesejosService {

    async cadastrarListaDesejos(idCliente, idProduto, nameList) {
        
        const novaListaDesejos = await new ListaDesejos({idCliente, idProduto, nameList})

        // Inserindo a nova lista de desejos na coleção de lista de desejos
        novaListaDesejos.save()

        // Inserindo o id desta lista de desejos dentro do documento do cliente
        let cliente = await Cliente.findOneAndUpdate({ _id: idCliente }, { $push: {wishlists: novaListaDesejos._id}})

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

    buscarPaginadoListaDesejos(query, pagina, limite) {
        console.log('Entrou no service')

         if (pagina === undefined) {
            pagina = 1
        } 
         if (limite === undefined) {
             limite = 5
        }
         if (query.nameList) {
            query.nameList = new RegExp(query.nameList, 'i')
        }
        if (query._code) {
            query._code = new RegExp(query._code, 'y')
        }
        
        var resultado = ListaDesejos.paginate(query, { page: pagina, limit: limite }, this.callbackBuscaListaDesejos)
        
        return resultado
    }

    callbackBuscaListaDesejos(erro, resultado) {
        // console.log('Executando callback')
        // console.log(erro)
        // console.log(resultado)
    }

    atualizarListaDesejos(idListaDesejos, listaDesejos) {
        return ListaDesejos.findOneAndUpdate({_id: idListaDesejos},listaDesejos)
    }

    removerListaDesejo(idListaDesejos) {
        return ListaDesejos.findOneAndDelete({_id: idListaDesejos})
    }


}

export default ListaDesejosService