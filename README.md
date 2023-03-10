# Backend Template

Esse repositório nasceu com o intuíto de facilitar o pontapé inicial dos meus projetos sem que tenha necessidade de sempre reconfigurar todas as ferramentas manualmente.

Ele possuí uma arquitura baseada no conceito hexagonal para alta escalabilidade e tem uma demonstração de código simplificado para seguir os mesmos conceitos e estrutura.

#### Overview

Para facilitar o desenvolvimento de aplicações, para essa branch eu utilizei:
- [Fastify](https://www.fastify.io) para desenvolver uma API mais performatica e com seus repectivos plugins;
- [Prisma](https://www.prisma.io) ORM para armazenar as informações;
- [GraphQL](https://graphql.org) para intermediar as requisições com intuíto de facilitar a comunicação entre multiplos dispositivos, também sendo utilizado:
  - [Mercurius](https://mercurius.dev/#/) para funcionar corretamente em conjunto com o **fastify**.
  - [type-graphql](https://typegraphql.com) para manter uma estrutura de orientação a objetos.
- [Jest](https://jestjs.io/) para realização de testes;
- [pnpm](https://pnpm.io/installation) como gerenciador de pacotes pela sua velocidade e vantagens de segurança;
- Arquitetura utilizando os principios de Clean Code, SOLID e DDD;

#### Sobre a arquitetura

A aplicação está estruturada da seguinte forma:

```
node_modules/
src/
├─ domain/
├─ infrastructure/
│  ├─ database/
├─ presentation/
│  ├─ _plugins/
│  ├─ App.ts
├─ shared/
├─ index.ts
test/
```
A divisão das resposabilidade de cada uma das camadas está da seguinte forma:
- `domain`: Responsável por conter resolvers, schemas e inputs do graphql.
- `infrastructure`: Responsável por conter e gerenciar comunicações externas, seja com banco de dados, com provedores como APIs externas e microserviços.
- `presentation`: Responsável por conter todas as configurações iniciais, como setup de banco de dados e do graphql.
  - `_plugins`: Contém uma serie de funções customizaveis com para ser injetado durante a inicialização da aplicação. [Fastify Plugins](https://www.fastify.io/docs/latest/Reference/Plugins/)
- `shared`: Responsável por conter tudo aquilo que pode ser compartilhado entre outras camadas, como tipagens, logger e configurações de ambiente.

#### Rodando localmente

Para rodar a aplicação, é necessario que o node esteja na versão `v14.18.*`, caso possua [nvm](https://github.com/nvm-sh/nvm), basta rodar o comando `nvm use` e ele deverá setar o ambiente para você.

Também é necessário instalar previamente o pacote [pnpm](https://pnpm.io/installation) antes de rodar a aplicação para seu melhor uso.

Após a versão e os pacotes instalados corretamente, na raiz do projeto, siga os seguintes comandos:
1. `cp .env.example .env`
2. `pnpm install`
3. `pnpm prisma migrate dev`
4. `pnpm dev`

Ao terminar, aplicação estará rodando [neste link](http://localhost:3333/graphiql)

#### Modo de uso

Ao acessar o link do servidor, exite uma query e uma mutation para exemplo de uso, são as seguintes:

```graphql
query {
  listUser {
    id
    name
    age
    address {
      state
      cep
      street
    }
  }
}
```

```graphql
mutation {
	createUser(input: {
    name: "Jeffs"
    age: 32
    address: {
      state: RJ
      cep: "25324-235"
    }
  }) {
   	id
    name
    age
    address {
      id
      state
      cep
      street
    }
  }
}
```


#### Futuras implementações

Nessa seção estarei deixado opções para serem implementadas futuramente para crianção de APIs nesse modelo.

- Para realizar validações, é importante incluir **class-decorators**, veja mais em [validações com typegraphql](https://typegraphql.com/docs/validation.html)
- Verificar a versão de lançamento da ferramenta [typegraphql](https://www.npmjs.com/package/type-graphql), atualmente está sendo usado a versão beta, atualizar para versão stable quando houver compativel com fastify v4
- Adicionar testes usando o seguinte exemplo: [Video de demonstração](https://www.youtube.com/watch?v=zR8jKR9hnFA)
