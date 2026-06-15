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
  - Validações: título (caracteres ≥2), autor (caracteres ≥2), sinopse (caracteres ≥10), ano (1000 –> ano atual), gênero (lista pré‑definida)
  - Cada livro pertence a um usuário (relacionamento 1:N)

- **Persistência**
  - Banco de dados relacional com Prisma ORM
  - DAOs (Data Access Objects) separados da lógica de domínio
  - Mapeamento objeto‑relacional manual (sem perda de validações)

    <img width="806" height="262" alt="image" src="https://github.com/user-attachments/assets/88a9b5b2-153c-44ca-a413-49a068ce2c43" />

    <img width="1283" height="573" alt="Captura de tela 2026-05-31 205403" src="https://github.com/user-attachments/assets/69690f5d-4562-4ddc-a42a-9608cf2a2074" />



## Tecnologias Utilizadas

- **Node.js**
- **TypeScript** – tipagem estática e classes com encapsulamento
- **JavaScrip**
- **JsonWebToken**
- **bcrypt** - criptografia da senha em estilo hash, para reduzir a vulnerabilidade do 'site'
- **express** - criação do servidor https
- **Prisma ORM** – migrations e acesso ao banco de dados
- **SQLite**
- **ES Modules** – organização modular do código

## Estrutura da pasta projeto
```
______________________________________________________________________________________________________________________
projeto/
|--- src/
| |---app/
| |      |--- controller/
| |      |          |--- LivroController.js # possibilita a criação das rotas de livro
| |      |          |--- UsuarioController.js #possibilita a criação das rotas de usuario
| |      |
| |      |--- repositories/ ##ignoravel n sei se vou usar essa pasta by RPG
| |
| |--- config/
│ │      |--- database.ts # Configuração do Prisma Client
| |
│ |--- dominio/
│ │      |--- Livro.ts # Classe Livro (encapsulamento, validações)            # modificado para o funcionamento do servidor by RPG
│ │      |--- Usuario.ts # Usuario (abstract) + UsuarioComum/UsuarioAdm       # modificado para o funcionamento do servidor by RPG
| |
│ |--- persistencia/
│ │      |--- LivroDAO.ts # Operações de persistência para Livro
│ │      |--- UsuarioDAO.ts # Operações para Usuario
| |
│ |--- (controllers/routes/view) # Camada de apresentação # Camada de apresentação (ainda em progresso)
│ |                                                         # (não incluso neste repositório)
│ |--- prisma/
| |      |--- schema.prisma # Modelos Usuario e Livro
│ |      |--- migrations/
| |
| |
| |--- app.js # impossibilita a visualização das rotas por terceiros em navegadore, aprimorando a segurança
| |
| |--- server.js # é onde fica o app.listen() que é oque cria o servidor
| |
| |--- routes.js # é onde está localizada todas as rotas que vão ser utilizadas
| |
| |--- package.json
| |--- tsconfig.json
|_____________________________________________________________________________________________________________________
```


## Integrantes do grupo
- David Leite (_　_)。゜zｚＺ
- José Renaldo ฅ^•ﻌ•^ฅ
- João Gabriel ༼ つ ◕_◕ ༽つ
