import ClienteService from './clientes-service'

class ClienteController {

    cadastrarCliente(cliente) {
        const clienteService = new ClienteService()
        return clienteService.cadastrarCliente(cliente)
    }

    listarClientes() {
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
       
        let pagina = params_query.pagina
        let limite = params_query.limite

        if (!pagina) {
            pagina = 1
        } 
        if (!limite) {
            limite = 5
        }

        if (params_query.name) {
            params_query.name = new RegExp(params_query.name, 'i')
        }
        if (params_query.email) {
            params_query.email = new RegExp(params_query.email, 'i')
        }

        const clienteService = new ClienteService()
        return clienteService.buscarPaginadoCliente(params_query, pagina, limite)
    }

    atualizarCliente(idCliente, cliente) {
        const clienteService = new ClienteService()
        return clienteService.atualizarCliente(idCliente, cliente)
    }

    async removerCliente(req, res) {

        let idCliente = req.params._id
        if (!idCliente) {
            res.status(400).json({ message: 'Para deletar um cliente é necessário informar seu id na URL da requisição.' })
        }

        // TODO: Verificar se cliente existe
        let checkCliente = await this.verificarSeClienteExiste(idCliente)
        if (!checkCliente) {
            return res.status(400).json({ message: `O idCliente informado não é válido: ${idCliente}` })
        }

        // TODO: Verificar se cliente possui wishlists
        let checkListasCliente = await this.verificarSeClientePossuiListaDesejos(idCliente)
        if (checkListasCliente) {
            return res.status(400).json({ message: `O cliente com id ${idCliente} não pode ser removido porque ele possui listas de desejos.` })
        }
        //TODO: Remove Cliente pelo id
        const clienteService = new ClienteService()
        let resultado = await clienteService.removerCliente(idCliente)
        return res.status(200).json({ message: `O cliente com id ${idCliente} foi deletado com suceso` })
    }    

    async verificarSeClienteExiste(idCliente) {
        const clienteService = new ClienteService()
        try {
            let cliente = await clienteService.listarClientesId(idCliente)
            if (cliente.length === 0) {
                return false
            }
            return true
        } catch (err) {
            console.error(err.message)
            return false
        }
    }

    async verificarSeClientePossuiListaDesejos(idCliente) {
        const clienteService = new ClienteService()

        let cliente = await clienteService.listarClientes(idCliente)
        .catch(err => { 
            console.error(err)
            return false
        })

        let arrayWishlists = cliente[0].wishlists

        if(arrayWishlists.length === 0) {
            return false
        }
        return true

    }
}

export default ClienteController