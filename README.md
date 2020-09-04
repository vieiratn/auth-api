# API de Autenticação de Usuários (Node.js) :desktop_computer:

Esta API, basicamente fornece três endpoints, respectivamente, para criação de conta, outra para autenticação e uma rota autenticada que só pode ser acessada caso o token correto seja fornecido.

## Objetivo

Criei essa API em Node.js para aprofundar meus conhecimentos em manipulação de usuários com persistência em Banco de Dados. Bem como, a autenticação de usuários com JWT.

## Tecnologias utilizadas.

- **Node.js** = Para base do projeto.
- **Express** = Para criar um servidor rápido e expor endpoints.
- **MongoDB Atlas** = Para persistir os meus usuários em banco de dados na nuvem.
- **Mongooose** = Para manipular e gerenciar o banco de dados.
- **Bcrypt** = Para criptografar as senhas dos usuários antes de persistir no banco de dados.
- **JsonWebToken** = Para gerar e verificar os tokens dos usuários.
- **Dotenv** = Para gerênciar e manipular variáveis de ambiente.

## Rotas (Endpoints)

#### Sign-up

`/auth/sign-up`: Rota para criar um usuário, ela espera um body com o seguinte formato:

**JSON**

> {"name": "Your Name", "email": "your@email", "password: "your@secure\$Password"}

**Retorno do Endpoint**: Usuário criado, juntamente com um Token para acesso ao endpoint protegido.

---

#### Sign-in

`/auth/sign-in`: Rota para autenticar um usuário, ela espera um body com o seguinte formato:

**JSON**

> {"email": "your@email", "password: "your@secure\$Password"}

**Retorno do Endpoint**: Usuário autenticado, juntamente com um Token para acesso ao endpoint protegido.

---

#### App/Main

`/app/main`: Rota protegida somente para acesso com o token fornecido, ela espera um body com o seguinte formato:

**AUTHORIZATION/BEARER TOKEN**

> Bearer Token

**Retorno do Endpoint**: Mensagem de saudação com ID do usuário logado.

## Como Clonar este Repositório

- Rodar o comando para clonar o repositório: `git clone `

- Acessar a pasta do projeto e fazer download das dependências externas com o comando: `yarn`

- Criar uma conta no serviço do MongoDB Atlas e anotar os dados do banco criado para essa aplicação.

- Configurar o arquivo `env-sample` renomeando o mesmo para `.env` e fornecendo as variáveis de ambiente abaixo:

  - DB_NAME: Nome do seu banco de dados no MongoDB Atlas.
  - DB_USER: Usuário do seu banco de dados no MongoDB Atlas.
  - DB_PASS: Senha do seu banco de dados no MongoDB Atlas.
  - APP_SECRET: Uma string qualquer que será utilizada para gerar e decodificar o JWT dos usuários.

- Rodar a aplicação com o comando `yarn start`

**Happy Hacking!** :rocket: :rocket: :rocket:

## Controle de Versão

1.0.0 > Primeira versão funcional.
