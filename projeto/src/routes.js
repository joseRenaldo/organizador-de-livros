import express from "express";
import LivroController from "./app/controllers/LivroController.js";
import UsuarioController from "./app/controllers/UsuarioController.js";
import authMiddleware from "./app/middlewares/authMiddleware.js";
import AuthController from "./app/controllers/AuthController.js"; 

const routes = express.Router();

// Rotas de Livros -------------------
routes.post('/livro',authMiddleware, LivroController.criarLivro);
routes.get('/livro/usuario/:usuarioId', LivroController.pesquisarLivros);
routes.get('/livro', LivroController.listarTodosLivros);
routes.get('/livro/:id', LivroController.buscarLivroPorId);
routes.put('/livro/:id',authMiddleware, LivroController.atualizarLivro);
routes.delete('/livro/:id',authMiddleware, LivroController.excluirLivro);
    
// Rotas de Usuários -----------------
//routes.post('/usuario', UsuarioController.criarUsuario); agora é a rota na aba login "registrar"
routes.get('/usuario/email/:email', UsuarioController.buscarPorEmail);
routes.get('/usuario/:id', UsuarioController.buscarPorId);
routes.get('/usuario',authMiddleware, UsuarioController.listarTodosUsuarios);
routes.put('/usuario/:id',authMiddleware, UsuarioController.atualizarUsuario);
routes.delete('/usuario/:id',authMiddleware, UsuarioController.excluirUsuario);

// Rota de login ---------------------
routes.post('/login', AuthController.login);
routes.post('/registrar', UsuarioController.criarUsuario);

export default routes;