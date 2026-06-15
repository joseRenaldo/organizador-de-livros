import { UsuarioDAO } from "../../persistencia/UsuarioDAO.ts";
import { UsuarioComum, UsuarioAdm } from "../../dominio/Usuario.ts";
import bcrypt from 'bcryptjs'

const usuarioDAO = new UsuarioDAO();

class UsuarioController {
    async criarUsuario(req, res) {

        try {

            const { nome, email, senha, dataNascimento, tipo } = req.body;
                        const senhaCrypto = await bcrypt.hash(senha, 10);
            // É essencial converter a string de data para um objeto Date real
            const dataNasce = new Date(dataNascimento);
            
            let novoUsuario;
            if (tipo === "ADM") {
                novoUsuario = new UsuarioAdm(nome, email, senhaCrypto, dataNasce);
            } else {
                novoUsuario = new UsuarioComum(nome, email, senhaCrypto, dataNasce);
            }

           
            const usuarioSalvo = await usuarioDAO.criar(novoUsuario);
            
           
            res.status(201).json({ message: 'Usuário criado com sucesso!', usuario: usuarioSalvo });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async buscarPorEmail(req, res) {
        const usuario = await usuarioDAO.buscarPorEmail(req.params.email);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    }

    async buscarPorId(req, res) {
        const usuario = await usuarioDAO.buscarPorId(Number(req.params.id));
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    }

    async listarTodosUsuarios(req, res) {
        const usuarios = await usuarioDAO.listarTodos();
        res.status(200).json(usuarios);
    }

    async atualizarUsuario(req, res) {
        try {
            const { nome, email, senha, dataNascimento, tipo } = req.body;
            let usuarioObj;
            if (tipo === "ADM") {
                usuarioObj = new UsuarioAdm(nome, email, senha, new Date(dataNascimento), Number(req.params.id));
            } else {
                usuarioObj = new UsuarioComum(nome, email, senha, new Date(dataNascimento), Number(req.params.id));
            }

            const usuarioAtualizado = await usuarioDAO.atualizar(usuarioObj);
            res.status(200).json(usuarioAtualizado);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao atualizar usuário', error: error.message });
        }
    }

    async excluirUsuario(req, res) {
        const usuarioExcluido = await usuarioDAO.deletar(Number(req.params.id));
        if (usuarioExcluido) {
            res.status(200).json({ message: 'Usuário excluído com sucesso!' });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    }
}

export default new UsuarioController();

//teste de criação de usuário postman
/* 
{
    "nome": "jose",
    "email": "jrpg@gmail.com",
    "senha": "1234567",
    "dataNascimento":"2000-09-13",
    "tipo": "ADM"

} 
*/