import jwt from 'jsonwebtoken';

const JWT_SECRET = "jao_trabalha_pfv";


export default function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    // Verificar se o header Authorization existe
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    // O header costuma vir no formato: "Bearer <TOKEN>", vamos dividir a string
    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Erro no formato do Token' });
    }

    const token = parts[1];

    // Validar o Token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido ou expirado' });
        }

        // Se estiver tudo certo, injetamos os dados decodificados na requisição
        req.usuarioLogado = {
            id: decoded.id,
            email: decoded.email,
            tipo: decoded.tipo
        };

        return next(); // Passa para o próximo controller da rota
    });
}