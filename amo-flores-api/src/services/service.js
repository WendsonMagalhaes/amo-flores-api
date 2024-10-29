import repository from "../repository/repository.js"


async function Listar() {
    try {
        const result = await repository.Listar(); // Chama a função Listar da camada de repositório
        console.log('Resultado:', result);
        return result;
    } catch (error) {
        console.error('Erro ao listar:', error.message);
        throw new Error('Erro ao listar pedidos'); // Lança um erro para a camada do controlador
    }
}



async function UltimoPedido() {
    try {
        const result = await repository.UltimoPedido(); // Chama a função Listar da camada de repositório
        console.log('Resultado:', result);
        return result;
    } catch (error) {
        console.error('Erro ao listar:', error.message);
        throw new Error('Erro ao listar pedidos'); // Lança um erro para a camada do controlador
    }
}
async function InserirPedido(dados) {
    try {
        const result = await repository.InserirPedido(dados); // Chama a função InserirPedido da camada de repositório
        console.log('Resultado da inserção:', result);
        return result; // Retorna o resultado da inserção
    } catch (error) {
        console.error('Erro ao inserir pedido na camada de serviço:', error.message);
        throw error; // Lança o erro para a camada do controlador
    }
}
async function BuscarPedidoId(id) {
    try {
        const result = await repository.BuscarPedidoId(id); // Chama a função BuscarPedidoId da camada de repositório
        console.log('Resultado da busca:', result); // Atualizei a mensagem para refletir a operação correta
        return result; // Retorna o resultado da busca
    } catch (error) {
        console.error('Erro ao buscar pedido na camada de serviço:', error.message);
        throw error; // Lança o erro para a camada do controlador
    }
}
async function AlterarPagamentoId(id) {
    try {
        const result = await repository.AlterarPagamentoId(id); // Chama a função BuscarPedidoId da camada de repositório
        console.log('Resultado da busca:', result); // Atualizei a mensagem para refletir a operação correta
        return result; // Retorna o resultado da busca
    } catch (error) {
        console.error('Erro ao buscar pedido na camada de serviço:', error.message);
        throw error; // Lança o erro para a camada do controlador
    }
}

async function AlteraPedidoId(id, dados) {
    try {
        const result = await repository.AlteraPedidoId(id, dados);
        console.log('Resultado da inserção:', result);
        return result;
    } catch (error) {
        console.error('Erro ao inserir pedido na camada de serviço:', error.message);
        throw error;
    }
}

async function DeletePedidoId(id) {
    try {
        const result = await repository.DeletePedidoId(id); // Chama a função BuscarPedidoId da camada de repositório
        console.log('Resultado da busca:', result); // Atualizei a mensagem para refletir a operação correta
        return result; // Retorna o resultado da busca
    } catch (error) {
        console.error('Erro ao buscar pedido na camada de serviço:', error.message);
        throw error; // Lança o erro para a camada do controlador
    }
}
export default { Listar, UltimoPedido, InserirPedido, BuscarPedidoId, AlterarPagamentoId, AlteraPedidoId, DeletePedidoId }