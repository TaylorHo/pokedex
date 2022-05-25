# Pokedex - Front End

Parte visual da Pokedex (frontend) criada com [Angular 13](https://angular.io/), configurada com SASS, Typescript e testes unitários básicos (padrão do Angular).


&nbsp;
## Instalação

1 - Clone este repositório e acesse a pasta "frontend"
  - por ssh
```
git clone git@github.com:TaylorHo/pokedex.git && cd pokedex/frontend
```
  - ou por https
```
git clone https://github.com/TaylorHo/pokedex.git && cd pokedex/frontend
```

2 - Instale as dependências com [NPM](https://www.npmjs.com/)
```
npm i
```

3 - Rode a aplicação
  - É necessário que o backend esteja rodando. Para isso, rode o container do Docker (explicado no [README.md principal](../README.md)) ou rode o servidor local (explicado no [README.md do servidor](../server/README.md))
```
npm start
```

**Importante**: Caso o servidor/api não esteja rodando localmente na porta 3000, isto deve ser especificado no serviço da api, dentro de [src/app/services/api.service.ts](./src/app/services/api.service.ts), na linha 16.

Pronto!! Aplicação rodando =)