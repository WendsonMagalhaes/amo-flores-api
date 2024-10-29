import express from "express";
import cors from "cors";
import router from "./routes.js";

const app = express();
const PORT = process.env.PORT || 3007;

// Middleware para permitir CORS
app.use(cors());

// Middleware para analisar o corpo das requisições em JSON
app.use(express.json()); // Análise do corpo das requisições deve vir antes de definir as rotas

// Usando as rotas definidas
app.use(router);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`); // Altere '172.30.5.4' para 'localhost'
});
