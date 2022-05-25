# Pokedex - Server & API

Servidor e API criada com [Node.js](https://nodejs.dev/) e [Express](https://expressjs.com/). Documentação criada com [Swagger](https://swagger.io/) e conexão com o banco de dados com [mongoose](https://mongoosejs.com/) (para utilizar [MongoDB](https://www.mongodb.com/) como banco de dados).


&nbsp;
## Instalação

1 - Clone este repositório e acesse a pasta "server"
  - por ssh
```
git clone git@github.com:TaylorHo/pokedex.git && cd pokedex/server
```
  - ou por https
```
git clone https://github.com/TaylorHo/pokedex.git && cd pokedex/server
```

2 - Instale as dependências com [NPM](https://www.npmjs.com/)
```
npm i
```

3 - Rode a aplicação
  - É necessário definir uma variável de ambiente chamada ```MONGO_URI```, com a URI de um banco da dados MongoDB
```
MONGO_URI="sua_uri_do_mongodb" node server.js
```

Pronto!! Aplicação rodando =)

### Documentação

A documentação da API (com todos os dados necessários para entender seu funcionamento) vai estar disponível em:
  - [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)