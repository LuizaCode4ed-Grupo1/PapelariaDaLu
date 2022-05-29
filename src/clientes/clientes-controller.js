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

    listarClientesEListaDesejos(idCliente) {
        const clienteService = new ClienteService()
        return clienteService.listarClientesEListaDesejos(idCliente)
    }

    listarClientesEmail(emailCliente) {
        const clienteService = new ClienteService()
        return clienteService.listarClientesEmail(emailCliente)
    }

    buscarPaginadoCliente(params_query) {
        console.log('Entrou na busca paginada')
        
        let pagina = params_query.pagina
        let limite = params_query.limite

        if (!pagina) {
            pagina = 1
        } 
        if (!limite) {
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


    async verificarSeClientePossuiListaDesejos(idCliente) {
        const clienteService = new ClienteService()
        let cliente = await clienteService.listarClientesId(idCliente)
        
        .catch(err => { 
            console.log(err)
            return false
        })
        console.log(cliente)

        console.log(cliente.wishlists)
        return false
    }
}

export default ClienteController