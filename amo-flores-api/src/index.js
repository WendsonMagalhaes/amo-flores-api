import express from "express";
import cors from "cors";
import router from "./routes.js";

const app = express();
const PORT = process.env.PORT || 3007;

// Middleware para permitir CORS
app.use(cors());

// Middleware para analisar o corpo das requisições em JSON
app.use(express.json()); // Mova esta linha para cima, antes das rotas

// Usando as rotas definidas
app.use(router);

// Inicia o servidor
app.listen(PORT, '172.30.5.4', () => {
    console.log(`Server running at http://172.30.5.4:${PORT}`);
});