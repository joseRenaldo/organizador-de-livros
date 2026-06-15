import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { UsuarioDAO } from '../../persistencia/UsuarioDAO'

const usuarioDAO = new UsuarioDAO();

const JWT_SECRET = "jao_trabalha_pfv"

class AuthController {
    async login(req, res) {
        try {
            const { email, senha } = req.body;

            // email existente?
            const usuario = await usuarioDAO.buscarPorEmail(email);
            if (!usuario) {
            return res.status(401).json({ message: 'E-mail ou senha inválidos' });
            }

            //Verifica a senha
            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if (!senhaValida) {
                return res.status(401).json({ message: 'E-mail ou senha inválidos' });
            }

            //Gerar o Token 
            const token = jwt.sign(
                { id: usuario.id, email: usuario.email, tipo: usuario.getNivelAcesso() },
                JWT_SECRET,
                { expiresIn: '1d' } 
            );

            //  Retorna token 
            return res.status(200).json({
                message: 'Login realizado com sucesso!',
                token,
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    tipo: usuario.getNivelAcesso()
                }
            });

        } catch (error) {//      |______  ?      ?      
            //ação n comcluida   (|)o _ o) ?  ?
            //                   /   Y  \       ?
            //                   |__/    |
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new AuthController();