import { LivroDAO } from '../../persistencia/LivroDAO.ts'; 
import { Livro } from '../../dominio/Livro.ts';

const livroDAO = new LivroDAO();

class LivroController {

    async criarLivro(req, res) {
        try {
            const { titulo, autor, genero, anoPublicacao, sinopse } = req.body;
            const ano = typeof anoPublicacao === 'string' && anoPublicacao.includes('-')
                ? new Date(anoPublicacao).getFullYear()
                : Number(anoPublicacao);

            const usuarioId = req.usuarioLogado.id //impede que uma pessoa adicione o id de outra pessoa 

            const novoLivro = new Livro(titulo, autor, genero, ano, sinopse, Number(usuarioId));
            
            const livroSalvo = await livroDAO.criar(novoLivro);
            res.status(201).json({ message: 'Livro criado com sucesso!', livro: livroSalvo });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async pesquisarLivros(req, res) {
        const livros = await livroDAO.pesquisar(Number(req.params.usuarioId), req.query.termo || '');
        if (livros && livros.length > 0) {
            res.status(200).json(livros);
        } else {
            res.status(404).json({ message: 'Livros não encontrados' });
        }
    }

    async listarTodosLivros(req, res) {
        const livros = await livroDAO.listarTodos();
        res.status(200).json(livros);
    }

    async buscarLivroPorId(req, res) {
        const livro = await livroDAO.buscarPorId(Number(req.params.id));
        if (livro) {
            res.status(200).json(livro);
        } else {
            res.status(404).json({ message: 'Livro não encontrado' });
        }
    }

    async atualizarLivro(req, res) {
        try {
            const livroAtualizado = await livroDAO.atualizar(Number(req.params.id), req.body);
            res.status(200).json({ message: 'Livro atualizado com sucesso!', livro: livroAtualizado });
        } catch (error) {
            res.status(400).json({ message: 'Erro ao atualizar livro', error: error.message });
        }
    }

    async excluirLivro(req, res) {
        const livroExcluido = await livroDAO.remover(Number(req.params.id));
        if (livroExcluido) {
            res.status(200).json({ message: 'Livro excluído com sucesso!' });
        } else {
            res.status(404).json({ message: 'Livro não encontrado' });
        }
    }
}

export default new LivroController();

//teste de criação de livro postman
/* {
    "titulo": "Dom Casmurro",
    "autor": "Machado de Assis",
    "genero": "Romance",
    "anoPublicacao": "1899",
    "sinopse": "Novela considerada uma das obras-primas da literatura brasileira.",
    "usuarioId": "1"
} */
