import express from "express";
import LivroController from "./app/controllers/LivroController.js";
import UsuarioController from "./app/controllers/UsuarioController.js";
import authMiddleware from "./app/middlewares/authMiddleware.js";
import AuthController from "./app/controllers/AuthController.js";
import { LivroDAO } from "./persistencia/LivroDAO.ts";
import { Livro } from "./dominio/Livro.ts";

const routes = express.Router();
const livroDAO = new LivroDAO();

async function renderHome(res, { livros = null, mensagem = null, erro = null, termo = '', usuarioId = 0 } = {}) {
  if (!livros) {
    if (usuarioId && usuarioId > 0) {
      livros = await livroDAO.listarPorUsuario(usuarioId);
    } else {
      livros = await livroDAO.listarTodos();
    }

    if (termo) {
      const termoLower = termo.toLowerCase();
      livros = livros.filter((livro) =>
        [livro.titulo, livro.autor, livro.genero].some((campo) =>
          campo && campo.toLowerCase().includes(termoLower),
        ),
      );
    }
  }

  res.render('home', {
    livros,
    mensagem,
    erro,
    termo,
    usuarioId,
  });
}

routes.get('/', async (req, res) => {
  try {
    await renderHome(res, { termo: String(req.query.termo || ''), usuarioId: Number(req.query.usuarioId || 0) });
  } catch (error) {
    res.status(500).render('home', {
      livros: [],
      mensagem: null,
      erro: error.message || 'Erro ao carregar a página',
      termo: '',
      usuarioId: 0,
    });
  }
});

routes.get('/livros', async (req, res) => {
  try {
    await renderHome(res, { termo: String(req.query.termo || ''), usuarioId: Number(req.query.usuarioId || 0) });
  } catch (error) {
    res.status(500).render('home', {
      livros: [],
      mensagem: null,
      erro: error.message || 'Erro ao carregar a página',
      termo: '',
      usuarioId: 0,
    });
  }
});

routes.get('/livros/pesquisar', async (req, res) => {
  try {
    const termo = String(req.query.termo || '');
    const usuarioId = Number(req.query.usuarioId || 0);
    const livros = await livroDAO.pesquisar(usuarioId, termo);

    await renderHome(res, {
      livros,
      mensagem: livros.length === 0 ? 'Nenhum livro encontrado' : null,
      termo,
      usuarioId,
    });
  } catch (error) {
    res.status(500).render('home', {
      livros: [],
      mensagem: null,
      erro: error.message || 'Erro ao pesquisar livros',
      termo: '',
      usuarioId: 0,
    });
  }
});

routes.post('/livros', async (req, res) => {
  try {
    const { titulo, autor, genero, anoPublicacao, sinopse, usuarioId = '0' } = req.body;
    const usuarioIdNumero = Number(usuarioId);
    if (usuarioIdNumero <= 0) {
      throw new Error('Faça login antes de adicionar um livro.');
    }

    const novoLivro = new Livro(
      titulo,
      autor,
      genero,
      Number(anoPublicacao),
      sinopse,
      usuarioIdNumero,
    );

    await livroDAO.criar(novoLivro);
    res.redirect('/?mensagem=' + encodeURIComponent('Livro adicionado com sucesso!'));
  } catch (error) {
    const livros = await livroDAO.listarTodos();
    res.status(400).render('home', {
      livros,
      mensagem: null,
      erro: error.message || 'Erro ao adicionar livro',
      termo: '',
      usuarioId: Number(req.body.usuarioId || 0),
    });
  }
});

routes.post('/livros/:id/delete', async (req, res) => {
  try {
    await livroDAO.remover(Number(req.params.id));
    res.redirect('/?mensagem=' + encodeURIComponent('Livro excluído com sucesso!'));
  } catch (error) {
    const livros = await livroDAO.listarTodos();
    res.status(500).render('home', {
      livros,
      mensagem: null,
      erro: error.message || 'Erro ao excluir livro',
      termo: '',
      usuarioId: Number(req.query.usuarioId || 1),
    });
  }
});

routes.post('/livros/:id/editar', async (req, res) => {
  try {
    const { titulo, autor, genero, anoPublicacao, sinopse } = req.body;
    await livroDAO.atualizar(Number(req.params.id), {
      titulo,
      autor,
      genero,
      anoPublicacao: Number(anoPublicacao),
      sinopse,
    });

    res.redirect('/?mensagem=' + encodeURIComponent('Livro atualizado com sucesso!'));
  } catch (error) {
    const livros = await livroDAO.listarTodos();
    res.status(400).render('home', {
      livros,
      mensagem: null,
      erro: error.message || 'Erro ao atualizar livro',
      termo: '',
      usuarioId: Number(req.body.usuarioId || 1),
    });
  }
});

// Rotas de Livros API -------------------
routes.post('/livro', authMiddleware, LivroController.criarLivro);
routes.get('/livro/usuario/:usuarioId', LivroController.pesquisarLivros);
routes.get('/livro', LivroController.listarTodosLivros);
routes.get('/livro/:id', LivroController.buscarLivroPorId);
routes.put('/livro/:id', authMiddleware, LivroController.atualizarLivro);
routes.delete('/livro/:id', authMiddleware, LivroController.excluirLivro);

// Rotas de Usuários -----------------
//routes.post('/usuario', UsuarioController.criarUsuario); agora é a rota na aba login "registrar"
routes.get('/usuario/email/:email', UsuarioController.buscarPorEmail);
routes.get('/usuario/:id', UsuarioController.buscarPorId);
routes.get('/usuario', authMiddleware, UsuarioController.listarTodosUsuarios);
routes.put('/usuario/:id', authMiddleware, UsuarioController.atualizarUsuario);
routes.delete('/usuario/:id', authMiddleware, UsuarioController.excluirUsuario);

// Rota de login ---------------------
routes.post('/login', AuthController.login);
routes.post('/registrar', UsuarioController.criarUsuario);

export default routes;