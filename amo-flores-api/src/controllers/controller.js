import services from "../services/service.js"
import repository from "../repository/repository.js"


async function Listar(req, res) {
    try {
        const pedidos = await services.Listar(); // Chama a função Listar da camada de serviços
        if (pedidos) {
            res.status(200).json(pedidos); // Retorna os valores preenchidos como resposta
        } else {
            res.status(404).send('A coluna A está vazia.');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function UltimoPedido(req, res) {
    try {
        const pedidos = await services.UltimoPedido(); // Chama a função Listar da camada de serviços
        if (pedidos) {
            res.status(200).json(pedidos); // Retorna os valores preenchidos como resposta
        } else {
            res.status(404).send('A coluna A está vazia.');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function InserirPedido(req, res) {
    const { values } = req.body;

    // Verifica se values está definido
    if (!values || !Array.isArray(values)) {
        return res.status(400).send('O campo "values" está ausente ou o corpo da requisição está vazio.');
    }

    try {
        const pedido = await services.InserirPedido({ values });
        if (pedido) {
            res.status(200).json(pedido);
        } else {
            res.status(404).send('A coluna A está vazia.');
        }
    } catch (error) {
        console.error('Erro na inserção do pedido:', error);
        res.status(500).send(error.message);
    }
}
async function BuscarPedidoId(req, res) {
    const { id } = req.params;

    try {
        const pedido = await services.BuscarPedidoId(id);
        if (pedido) {
            res.status(200).json(pedido);
        } else {
            res.status(404).send('A coluna A está vazia.');
        }
    } catch (error) {
        console.error('Erro ao buscar o pedido:', error.message);
        res.status(500).send(error.message);
    }
}
async function AlterarPagamentoId(req, res) {
    const id = req.params.id;

    try {
        const pedido = await services.AlterarPagamentoId(id);
        if (pedido) {
            res.status(200).json(pedido);
        } else {
            res.status(404).send('A coluna A está vazia.');
        }
    } catch (error) {
        console.error('Erro ao buscar o pedido:', error.message);
        res.status(500).send(error.message);
    }
}


async function AlteraPedidoId(req, res) {
    const id = req.params.id;
    const { homenageado, setor, quadra, lote, valor, observacao } = req.body;

    // Verifica se todos os campos obrigatórios estão presentes
    if (!homenageado || !setor || !quadra || !lote || !valor || !observacao) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    try {
        const pedido = await services.AlteraPedidoId(id, { homenageado, setor, quadra, lote, valor, observacao });
        if (pedido) {
            res.status(200).json(pedido);
        } else {
            res.status(404).send('Produto não encontrado.');
        }
    } catch (error) {
        console.error('Erro na inserção do pedido:', error.message);
        res.status(500).send(error.message);
    }
}

async function DeletePedidoId(req, res) {
    const { id } = req.params;

    try {
        const pedido = await services.DeletePedidoId(id);
        if (pedido) {
            res.status(200).json(pedido);
        } else {
            res.status(404).send('A coluna A está vazia.');
        }
    } catch (error) {
        console.error('Erro ao buscar o pedido:', error.message);
        res.status(500).send(error.message);
    }
}
export default { Listar, UltimoPedido, InserirPedido, BuscarPedidoId, AlterarPagamentoId, AlteraPedidoId, DeletePedidoId }