// Importação das dependências externas.
import express from 'express';
import mongoose from 'mongoose';

// Importação das dependências proprietárias.
import dotenv from 'dotenv';

// Setando DOTENV.
dotenv.config();

// Importação do Router.
import authController from './controllers/authController.js';
import appController from './controllers/appController.js';

// Instanciando o Express.
const app = express();

// Configurano o Express para aceitar JSON.
app.use(express.json());

// Configurando conexão com o Banco de Dados.
const { DB_USER, DB_PASS, DB_NAME } = process.env;
mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@mongodb.vnf9i.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

// Instanciando o Mongoose Connection.
const connection = mongoose.connection;

// Assim que a conexão é estabelecida com o Banco, dispara a callback.
connection.once('open', (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('MongoDB is up and running. Happy hacking!');
  }
});

// Rota de criação e autenticação de conta.
app.use('/auth', authController);

// Rota APP (Autenticada).
app.use('/app', appController);

// Iniciando servidor na porta 3000.
app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Server is up and running on port 3000. Happy hacking!');
  }
});
