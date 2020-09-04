// Importação das dependências.
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Importação dos Models.
import User from '../models/UserModel.js';

// Instanciando o Router do Express.
const router = express.Router();

// Instanciando o dotenv.
dotenv.config();

// Função para gerar automaticamente o JWT.
function generateToken(params = {}) {
  return jwt.sign(params, process.env.APP_SECRET, {
    expiresIn: 86400,
  });
}

// Definindo Rota de Cadastro.
router.post('/sign-up', async (req, res) => {
  // Capturar resultado do JSON enviado.
  const { name, email, password } = req.body;

  try {
    // Verificar se o usuário existe.
    const result = await User.findOne({ email });

    // Caso o usuário exista, retorna erro.
    if (result) {
      res.status(400).send({ error: 'User already exists.' });
    }

    // Caso não exista, criar usuário.
    const user = await User.create({ name, email, password });

    // Caso usuário não tenha sido criado, retornar erro.
    if (!user) {
      res
        .status(400)
        .send({ error: 'An error has occurred, please, try again.' });
    }

    // Removendo senha do retorno do usuário.
    user.password = undefined;

    // Caso usuário tenha sido criado, retornar usuário com Token.
    res.status(200).send({
      user,
      token: generateToken({ id: user.id }),
    });
  } catch (error) {
    res
      .status(400)
      .send({ error: 'An error has occurred, please, try again.' });
  }
});

// Definindo Rota de Autenticação.
router.post('/sign-in', async (req, res) => {
  // Capturar resultado do JSON enviado.
  const { email, password } = req.body;

  try {
    // Consulta no banco para verificar se o usuário existe.
    const user = await User.findOne({ email }).select('+password');

    // Caso usuário não exista no banco, retornar erro.
    if (!user) {
      res.status(400).send({ error: 'User not found.' });
    }

    // Caso exista, vamos verificar o match do password.
    const userMatch = await bcrypt.compare(password, user.password);

    // Caso as senhas não confiram, retorna erro.
    if (!userMatch) {
      res.status(400).send({ error: 'Wrong user and/or password, try again.' });
    }

    // Caso confiram, vamos remover a senha.
    user.password = undefined;

    // Caso confiram, retornamos o usuário sem a senha e com Token.
    res.status(200).send({
      user,
      token: generateToken({ id: user.id }),
    });
  } catch (error) {
    res
      .status(400)
      .send({ error: 'An error has occurred, please, try again.' });
  }
});

// Exportando a Rota.
export default router;
