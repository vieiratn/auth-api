// Importação das dependências.
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Instanciando o dotenv.
dotenv.config();

// Exportação da função padrão de Middleware para verificação de Token.
function authMiddleware(req, res, next) {
  // Buscando a informação para realizar a autenticação.
  const authHeader = req.headers.authorization;

  // Se não houver header, retorna erro.
  if (!authHeader) {
    res.status(401).send({ error: 'No token provided.' });
  }

  // Dividindo o header em dois, pelo espaço.
  const parts = authHeader.split(' ');

  // Se não tiver duas partes, retorna erro.
  if (!parts.length === 2) {
    res.status(401).send({ error: 'Token error.' });
  }

  // Desestruturando as partes da autenticação.
  const [prefix, token] = parts;

  // Se não iniciar com Bearer, retorna erro.
  if (!/^Bearer$/i.test(prefix)) {
    res.status(401).send({ error: 'Token malformatted.' });
  }

  // Fazendo a verificação do token fornecido com callback.
  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    // Se erro, retorna erro.
    if (err) {
      res.status(401).send({ error: 'Invalid token.' });
    }

    // Adicona o UserID na requisição para eventual manipulação.
    req.userId = decoded.id;

    // Chamada do Controller.
    next();
  });
}

export default authMiddleware;
