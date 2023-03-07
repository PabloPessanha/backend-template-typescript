# Backend Template

Esse repositório nasceu com o intuíto de facilitar o pontapé inicial dos meus projetos sem que tenha necessidade de sempre reconfigurar todas as ferramentas manualmente.

Ele possuí uma arquitura baseada no conceito hexagonal para alta escalabilidade e tem uma demonstração de código simplificado para seguir os mesmos conceitos e estrutura.

#### Overview

Para facilitar o desenvolvimento de aplicações, para essa branch eu utilizei:
- [Fastify](https://www.fastify.io) para desenvolver uma API mais performatica e com seus repectivos plugins;
- [Prisma](https://www.prisma.io) ORM para armazenar as informações;
- [Zod](https://zod.dev) para validação de requisições, criação de tipagens da aplicação e gerar uma documentação do [Swagger](https://swagger.io);
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
│  ├─ controllers/
│  ├─ routes/
│  ├─ App.ts
├─ shared/
├─ index.ts
test/
```
A divisão das resposabilidade de cada uma das camadas está da seguinte forma:
- `domain`: Responsável por conter toda a lógica e regra de negócio através de seus serviços.
- `infrastructure`: Responsável por conter e gerenciar comunicações externas, seja com banco de dados, com provedores como APIs externas e microserviços.
- `presentation`: Responsável por conter tudo o que é resposável pelo fluxo de entrada e saída da aplicação, tratativa de erro caso seja necessário e o todas as suas configurações iniciais.
  - `_plugins`: Contém uma serie de funções customizaveis com para ser injetado durante a inicialização da aplicação. [Fastify Plugins](https://www.fastify.io/docs/latest/Reference/Plugins/)
- `shared`: Responsável por conter tudo aquilo que pode ser compartilhado entre outras camadas, como tipagens, logger e configurações de ambiente.

#### Rodando localmente

Para rodar a aplicação, é necessario que o node esteja na versão `v14.18.*`, caso possua [nvm](https://github.com/nvm-sh/nvm), basta rodar o comando `nvm use` e ele deverá setar o ambiente para você.

Também é necessário instalar previamente o pacote [pnpm](https://pnpm.io/installation) antes de rodar a aplicação para seu melhor uso.

Após a versão e os pacotes instalados corretamente, na raiz do projeto, siga os seguintes comandos:
1. `cp .env.example .env`
2. `pnpm i`
3. `pnpm prisma migrate dev`
4. `pnpm dev`
