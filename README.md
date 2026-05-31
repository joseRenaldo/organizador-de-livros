# Organizador de Livros - Sistema de Gerenciamento Pessoal

Projeto acadêmico desenvolvido para a disciplina de **Banco de Dados**, **POO** e **PWEB**. O sistema permite o cadastro, consulta, atualização e remoção de livros, com controle de usuários (comum e administrador) e validações rigorosas no back‑end. A persistência de dados é feita com **Prisma ORM** (SQLite).

##  Funcionalidades Principais

- **Usuários**
  - Cadastro com nome, e‑mail, senha e data de nascimento (idade mínima: 12 anos)
  - Níveis de acesso: `COMUM` e `ADM` (herança e polimorfismo)
  - Login por e‑mail e senha (verificação no banco de dados)

- **Livros**
  - CRUD completo: criar, listar, pesquisar, atualizar e excluir
  - Atributos: título, autor, gênero, ano de publicação, sinopse
  - Validações: título (≥2 caracteres), autor (≥2), sinopse (≥10), ano (1000–ano atual), gênero (lista pré‑definida)
  - Cada livro pertence a um usuário (relacionamento 1:N)

- **Persistência**
  - Banco de dados relacional com Prisma ORM
  - DAOs (Data Access Objects) separados da lógica de domínio
  - Mapeamento objeto‑relacional manual (sem perda de validações)

## Tecnologias Utilizadas

- **Node.js**
- **TypeScript** – tipagem estática e classes com encapsulamento
- **Prisma ORM** – migrations e acesso ao banco de dados
- **SQLite**
- **ES Modules** – organização modular do código

## Estrutura da pasta projeto(A pasta correta com nosso trabalho, por favor ignorem o resto)
```
_________________________________________________________________
projeto/
|--- src/
| |--- config/
│ │      |--- database.ts # Configuração do Prisma Client
│ |--- dominio/
│ │      |--- Livro.ts # Classe Livro (encapsulamento, validações)
│ │      |--- Usuario.ts # Usuario (abstract) + UsuarioComum/UsuarioAdm
│ |--- persistencia/
│ │      |--- LivroDAO.ts # Operações de persistência para Livro
│ │      |--- UsuarioDAO.ts # Operações para Usuario
│ |--- (controllers/routes/view) # Camada de apresentação # Camada de apresentação (ainda em progresso)
│ |      |                                                   # (não incluso neste repositório)
│ |      |--- schema.prisma # Modelos Usuario e Livro
│ |      |--- migrations/
| |--- package.json
| |--- tsconfig.json
|__________________________________________________________________________________________________________________
```


## Integrantes do grupo
- David Leite (_　_)。゜zｚＺ
- José Renaldo ฅ^•ﻌ•^ฅ
- João Gabriel ༼ つ ◕_◕ ༽つ
