import ClienteService from './clientes-service'

class ClienteController {

    cadastrarCliente(cliente) {
        console.log('Cadastrando um novo cliente....', cliente)
        const clienteService = new ClienteService()
        return clienteService.cadastrarCliente(cliente)
    }

    listarClientes() {
        console.log('Exibindo clientes....')
        const clienteService = new ClienteService()
        return clienteService.listarClientes()  
    }

    listarClientesId(idCliente) {
        const clienteService = new ClienteService()
        return clienteService.listarClientesId(idCliente)
    }

    listarClientesEmail(emailCliente) {
        const clienteService = new ClienteService()
        return clienteService.listarClientesEmail(emailCliente)
    }

    buscarPaginadoCliente(params_query) {
        console.log('Entrou na busca paginada')
        
        var pagina = params_query.pagina
        var limite = params_query.limite

        if (pagina === undefined) {
            pagina = 1
         } 
         if (limite === undefined) {
             limite = 5
         }

        const clienteService = new ClienteService()
        return clienteService.buscarPaginadoCliente(params_query, pagina, limite)
    }

    atualizarCliente(idCliente, cliente) {
        console.log('Atualizando o cliente com o id: ', idCliente)
        const clienteService = new ClienteService()
        return clienteService.atualizarCliente(idCliente, cliente)
    }

    removerCliente(idCliente) {
        console.log('Removendo o cliente com o id: ', idCliente)
        const clienteService = new ClienteService()
        return clienteService.removerCliente(idCliente)
    }    

}

export default ClienteController