import controller from "./controllers/controller.js"
import { Router } from "express";

const router = Router();

router.get("/pedidos", controller.Listar);
router.get("/ultimo-pedido", controller.UltimoPedido);
router.post("/pedido", controller.InserirPedido);
router.get("/pedido/:id", controller.BuscarPedidoId);
router.get("/alterar-pagamento/:id", controller.AlterarPagamentoId);
router.post("/alterar-pedido/:id", controller.AlteraPedidoId);
router.delete("/excluir-pedido/:id", controller.DeletePedidoId);




export default router;


