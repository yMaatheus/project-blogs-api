# Project Blogs API

Projeto realizado no módulo de Back-end durante o curso de Desenvolvimento Web pela [Trybe](https://www.betrybe.com/).

## 📱 Projeto

Neste projeto foi desenvolvido uma aplicação em Node.js usando o pacote Sequelize para fazer um CRUD de posts, com endpoints seguindo os principios REST, para a produção de conteúdo para um blog! 

* [Documentação](https://blogs-api.ymaatheus.me/api-docs)
* [Deploy](https://blogs-api.ymaatheus.me)

### 📋 Pré-requisitos

Para conseguir seguir este README e rodar o projeto você pode precisar dos seguintes itens:

- [Git](https://git-scm.com/doc)
- [Node](https://nodejs.org/en/)
- [Npm](https://docs.npmjs.com/getting-started)
- [MySQL](https://www.mysql.com/)

## 🚀 Começando

Para ter acesso aos arquivos do projeto você pode clonar usando o seguinte comando:

```
git clone git@github.com:tryber/sd-019-c-project-blogs-api.git
```

### 🔧 Instalação

Agora que já tem a pasta do projeto na sua máquina, dentro dela instale as dependências:

```
npm install
```

Crie o arquivo .env e adicione as variaveis de ambiente, siga o exemplo abaixo:

```
NODE_ENV=development
PORT=3000

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DB_NAME=blogs-api
MYSQL_USER=root
MYSQL_PASSWORD=password

JWT_SECRET=suaSenhaSecreta
```

Crie as tabelas e popule o banco de dados:

```
npm run migration
npm run seed
```

Então podemos rodar o projeto:

```
npm start
```

## 🛠️ Construído com

* [Npm](https://docs.npmjs.com/getting-started) - Gerente de dependências
* [Express](http://www.dropwizard.io/1.0.2/docs/) - O framework
* [Javscript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) - Linguagem de programação
* [Sequelize](https://sequelize.org/) - Biblioteca ORM
* [Joi](https://www.npmjs.com/package/joi) - Biblioteca de validação
* [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Biblioteca JWT
* [Swagger](https://www.npmjs.com/package/swagger-ui-express) - Ferramenta de documentação
