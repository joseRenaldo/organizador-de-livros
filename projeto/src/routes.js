import express from "express";
import LivroController from "./app/controllers/LivroController.js";
import UsuarioController from "./app/controllers/UsuarioController.js";

const routes = express.Router();

// Rotas de Livros -------------------
routes.post('/livro', LivroController.criarLivro);
routes.get('/livro/usuario/:usuarioId', LivroController.pesquisarLivros);
routes.get('/livro', LivroController.listarTodosLivros);
routes.get('/livro/:id', LivroController.buscarLivroPorId);
routes.put('/livro/:id', LivroController.atualizarLivro);
routes.delete('/livro/:id', LivroController.excluirLivro);
    
// Rotas de Usuários -----------------
routes.post('/usuario', UsuarioController.criarUsuario);
routes.get('/usuario/email/:email', UsuarioController.buscarPorEmail);
routes.get('/usuario/:id', UsuarioController.buscarPorId);
routes.get('/usuario', UsuarioController.listarTodosUsuarios);
routes.put('/usuario/:id', UsuarioController.atualizarUsuario);
routes.delete('/usuario/:id', UsuarioController.excluirUsuario);

export default routes;