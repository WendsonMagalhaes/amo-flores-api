import { google } from 'googleapis';

const id_teste = '1PyzHdQ_MERqA4zq7R2I_gDdTQ13SJbOs6DG1nmuT3Ro';

async function getAuthSheets(id) {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: 'credentials.json', // Verifique se o caminho está correto
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const client = await auth.getClient();

        const googleSheets = google.sheets({
            version: 'v4',
            auth: client,
        });

        const spreadsheetId = id; // O ID da planilha deve ser passado como argumento

        return {
            auth,
            client,
            googleSheets,
            spreadsheetId,
        };
    } catch (error) {
        console.error('Erro ao autenticar com o Google Sheets:', error.message);
        throw new Error('Falha na autenticação do Google Sheets');
    }
}

async function Listar() {
    try {
        const { googleSheets, spreadsheetId } = await getAuthSheets(id_teste);

        // Busca os valores do intervalo especificado
        const getResponse = await googleSheets.spreadsheets.values.get({
            spreadsheetId,
            range: "PEDIDOS!A2:O", // O intervalo desejado
        });

        const columnBValues = getResponse.data.values;

        // Verifica se há valores preenchidos
        if (columnBValues && columnBValues.length > 0) {
            return { columnBValues }; // Retorna os valores preenchidos
        } else {
            console.log('A coluna A está vazia.');
            return null; // Retorna null se não houver valores
        }
    } catch (error) {
        console.error('Erro ao obter as linhas preenchidas:', error.message);
        return { error: 'Erro interno do servidor' }; // Retorna mensagem de erro
    }
}
async function UltimoPedido() {
    try {
        const { googleSheets, auth, spreadsheetId } = await getAuthSheets(id_teste);

        // Busca os valores da coluna B
        const getResponse = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "PEDIDOS!C:C", // Especifica a coluna B
        });

        const columnBValues = getResponse.data.values;
        let lastValue;

        if (columnBValues && columnBValues.length > 0) {
            lastValue = columnBValues[columnBValues.length - 1][0]; // Pega o último valor da coluna B
            return { lastValue }; // Retorna o último valor como resposta
        } else {
            console.log('A coluna C está vazia.');
            return null; // Retorna null se não houver valores
        }
    } catch (error) {
        console.error('Erro ao obter a última linha preenchida:', error.message);
        return { error: 'Erro interno do servidor' }; // Retorna mensagem de erro
    }

}
async function InserirPedido(dados) {

    try {
        const { googleSheets, auth, spreadsheetId } = await getAuthSheets(id_teste);
        const { values } = dados;

        if (!values) {
            throw new Error('Nenhum valor fornecido');
        }

        // Lê o último valor da coluna A
        const columnAData = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "PEDIDOS!A:A", // Obtém todos os valores da coluna A
        });

        const lastValueInColumnA = columnAData.data.values?.[columnAData.data.values.length - 1]?.[0] || null;

        // Adiciona o último valor da coluna A aos valores fornecidos
        const newValues = [Number(lastValueInColumnA) + 1, ...values];

        // Adiciona a nova linha com os novos valores
        const row = await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "PEDIDOS",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [newValues], // Certifique-se de que os dados estão no formato esperado
            },
        });

        console.log('Nova linha adicionada:', row.data);
        return row.data;
    } catch (error) {
        console.error('Erro ao adicionar nova linha:', error.message);
        throw new Error('Erro interno ao adicionar nova linha'); // Lança o erro para a camada de serviço
    }

}

// repository.js
async function BuscarPedidoId(id) {
    try {
        const { googleSheets, auth, spreadsheetId } = await getAuthSheets(id_teste);

        // Busca todos os valores da planilha para verificar o ID na coluna A
        const getResponse = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "PEDIDOS!A2:O",
        });

        const pedidos = getResponse.data.values;

        if (pedidos && pedidos.length > 0) {
            // Filtra pelo ID, assumindo que ele está na primeira coluna (A)
            const produtoEncontrado = pedidos.find(row => row[0] === id);

            if (produtoEncontrado) {
                return { produto: produtoEncontrado };
            } else {
                throw new Error(`Produto com ID ${id} não encontrado.`);
            }
        } else {
            console.log('Não há pedidos na planilha.');
            throw new Error('Não há pedidos na planilha.');
        }
    } catch (error) {
        console.error('Erro ao buscar o produto:', error.message);
        throw new Error('Erro interno do servidor');
    }
}
async function AlterarPagamentoId(id) {

    try {
        const { googleSheets, auth, spreadsheetId } = await getAuthSheets(id_teste);

        const sheetData = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "PEDIDOS!A:O",
        });

        const rows = sheetData.data.values;

        // Verifica se a planilha possui dados
        if (!rows || rows.length === 0) {
            throw new Error('Nenhum dado encontrado na planilha');
        }
        // Encontra o índice da linha que contém o ID do produto (assumindo que o ID está na coluna A)
        const rowIndex = rows.findIndex(row => row[0] === id);

        if (rowIndex === -1) {
            throw new Error('Produto não encontrado');
        }


        // Incrementa o valor
        const newValue = "SIM";

        // Atualiza o valor na célula específica
        const updateRange = `PEDIDOS!K${rowIndex + 1}`;
        await googleSheets.spreadsheets.values.update({
            auth,
            spreadsheetId,
            range: updateRange,
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [[newValue]], // Define o novo valor incrementado
            },
        });

        // Envia o valor atualizado como resposta
        return { message: `Pagamento confirmado` };
    } catch (error) {
        console.error('Erro ao incrementar valor:', error.message);
        throw new Error('Erro interno do servidor');
    }
}
async function AlteraPedidoId(id, { homenageado, setor, quadra, lote, valor, observacao }) {
    try {
        const { googleSheets, auth, spreadsheetId } = await getAuthSheets(id_teste);

        const range = "PEDIDOS!A:O";
        const sheetData = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range,
        });

        const rows = sheetData.data.values;

        if (!rows || rows.length === 0) {
            throw new Error('Nenhum dado encontrado na planilha');
        }

        const rowIndex = rows.findIndex(row => row[0] === id);

        if (rowIndex === -1) {
            throw new Error('Produto não encontrado');
        }

        const homenageadoCol = "E";
        const setorCol = "F";
        const quadraCol = "G";
        const loteCol = "H";
        const valorCol = "N";
        const observacaoCol = "O";

        await googleSheets.spreadsheets.values.batchUpdate({
            auth,
            spreadsheetId,
            resource: {
                data: [
                    { range: `PEDIDOS!${homenageadoCol}${rowIndex + 1}`, values: [[homenageado]] },
                    { range: `PEDIDOS!${setorCol}${rowIndex + 1}`, values: [[setor]] },
                    { range: `PEDIDOS!${quadraCol}${rowIndex + 1}`, values: [[quadra]] },
                    { range: `PEDIDOS!${loteCol}${rowIndex + 1}`, values: [[lote]] },
                    { range: `PEDIDOS!${valorCol}${rowIndex + 1}`, values: [[valor]] },
                    { range: `PEDIDOS!${observacaoCol}${rowIndex + 1}`, values: [[observacao]] },
                ],
                valueInputOption: "USER_ENTERED",
            },
        });

        return { message: "Os valores foram atualizados com sucesso" };
    } catch (error) {
        console.error('Erro ao atualizar valores:', error.message);
        throw new Error('Erro interno do servidor');
    }
}
async function DeletePedidoId(id) {
    try {
        const { googleSheets, auth, spreadsheetId } = await getAuthSheets(id_teste);

        // Busca todas as linhas da planilha
        const sheetData = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "PEDIDOS!A:O",
        });

        const rows = sheetData.data.values;

        // Verifica se a planilha possui dados
        if (!rows || rows.length === 0) {
            throw new Error('Nenhum dado encontrado na planilha');
        }

        // Encontra o índice da linha que contém o ID do produto (assumindo que o ID está na coluna A)
        const rowIndex = rows.findIndex(row => row[0] === id);

        if (rowIndex === -1) {
            throw new Error('Produto não encontrado');
        }

        // Prepara a solicitação para remover a linha
        const requests = [{
            deleteDimension: {
                range: {
                    sheetId: 0, // Substitua pelo ID da sua aba, se necessário
                    dimension: "ROWS",
                    startIndex: rowIndex,
                    endIndex: rowIndex + 1 // O intervalo é exclusivo, portanto, para deletar uma linha, o endIndex deve ser rowIndex + 1
                }
            }
        }];

        // Executa a operação de exclusão
        await googleSheets.spreadsheets.batchUpdate({
            auth,
            spreadsheetId,
            resource: {
                requests,
            },
        });

        // Envia a resposta de sucesso
        return { message: `Produto excluido com sucesso.` };
    } catch (error) {
        console.error('Erro ao apagar linha:', error.message);
        throw new Error('Erro interno do servidor');
    }
}
export default { Listar, UltimoPedido, InserirPedido, BuscarPedidoId, AlterarPagamentoId, AlteraPedidoId, DeletePedidoId };
