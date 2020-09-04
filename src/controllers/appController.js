// Importação das dependências.
import express from 'express';

// Importação do Middleware de autenticação.
import authMiddleware from '../middlewares/auth.js';

// Instanciando o Router do Express.
const router = express.Router();

// Rota autenticada que dá acesso para a rota principal da aplicação.
router.get('/main', authMiddleware, async (req, res) => {
  res.send({ message: 'Welcome to the APP/Main.', id: req.userId });
});

// Exportando a Rota.
export default router;
