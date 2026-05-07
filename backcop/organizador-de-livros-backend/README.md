# organizador-de-livros-backend

Este é o backend do projeto "Organizador de Livros", uma aplicação desenvolvida com TypeScript e Prisma. O objetivo do projeto é permitir que os usuários organizem sua coleção de livros de forma eficiente.

## Funcionalidades Principais

1. **Adicionar Livros**: Permite que os usuários insiram informações sobre novos livros, como título, autor, gênero, ano de publicação e uma breve sinopse.
2. **Pesquisar Livros**: Os usuários podem pesquisar livros por título, autor ou gênero, obtendo uma lista de resultados correspondentes.
3. **Visualizar Detalhes**: Os usuários podem ver os detalhes completos de um livro selecionado, incluindo sua sinopse.
4. **Editar Informações**: Os usuários podem atualizar os detalhes dos livros já cadastrados.
5. **Remover Livros**: Possibilidade de excluir livros da biblioteca permanentemente.

## Estrutura do Projeto

- **src/**: Contém o código-fonte da aplicação.
  - **app.ts**: Inicializa a aplicação Express e configura middleware.
  - **server.ts**: Inicia o servidor e escuta em uma porta especificada.
  - **routes/**: Define as rotas relacionadas a livros.
  - **controllers/**: Contém a lógica de negócios para cada rota.
  - **services/**: Interage com o repositório de livros.
  - **repositories/**: Realiza operações CRUD no banco de dados usando Prisma.
  - **prisma/**: Inicializa o cliente Prisma para interações com o banco de dados.
  - **dtos/**: Define os Data Transfer Objects (DTOs) para livros.
  - **middlewares/**: Middleware para tratamento de erros.
  - **utils/**: Utilitário de logger para registro de mensagens e erros.
  - **types/**: Definições de tipos TypeScript usadas na aplicação.

- **prisma/**: Contém o esquema do banco de dados para o Prisma ORM.
- **.env.example**: Exemplo de variáveis de ambiente necessárias para a aplicação.
- **package.json**: Lista as dependências e scripts do projeto.
- **tsconfig.json**: Configuração do TypeScript.
- **.gitignore**: Especifica arquivos e diretórios a serem ignorados pelo Git.

## Como Executar o Projeto

1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Configure as variáveis de ambiente no arquivo `.env`.
4. Execute as migrações do Prisma com `npx prisma migrate dev`.
5. Inicie o servidor com `npm run start`.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.