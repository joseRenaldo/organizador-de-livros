import { prisma } from "./config/database";
import { Livro } from "./dominio/Livro";
import { LivroDAO } from "./persistencia/LivroDAO";
import { UsuarioAdm, UsuarioComum } from "./dominio/Usuario";
import { UsuarioDAO } from "./persistencia/UsuarioDAO";

const usuarioDAO = new UsuarioDAO();
const livroDAO = new LivroDAO();

function secao(titulo: string) {
  console.log(`\n=== ${titulo.toUpperCase()} ===`);
}

async function main() {
  console.log("========= TESTE CRUD =========");

  try {
    // USUÁRIOS

    secao("Criando usuários");

   const adminSalvo = await usuarioDAO.criar(
  new UsuarioAdm(
    "Carlos Admin",
    "carlos@admin.com",
    "senha123",
    new Date("1985-03-20")
  )
);

const comumSalvo = await usuarioDAO.criar(
  new UsuarioComum(
    "Ana Comum",
    "ana@comum.com",
    "123456",
    new Date("2000-07-15")
  )
);

// Fiz esses if porque o TypeScript não consegue garantir 
// que o ID será definido, mesmo que o banco de dados
// o faça porque ele é burro e chei de frescura

if (adminSalvo.id == null) {
  throw new Error("Admin salvo sem ID.");
}

if (comumSalvo.id == null) {
  throw new Error("Usuário salvo sem ID.");
}

const adminId: number = adminSalvo.id;
const comumId: number = comumSalvo.id;

    console.log(
      `Admin: ${adminId} | ${adminSalvo.nome} | ${adminSalvo.getNivelAcesso()}`
    );

    console.log(
      `Usuário: ${comumId} | ${comumSalvo.nome} | ${comumSalvo.getNivelAcesso()}`
    );

    secao("Buscando usuário por email");

    const usuarioEncontrado = await usuarioDAO.buscarPorEmail(
      "ana@comum.com"
    );

    if (usuarioEncontrado) {
      console.log(
        `Encontrado: ${usuarioEncontrado.nome} | Nível: ${usuarioEncontrado.getNivelAcesso()}`
      );
    }

    secao("Listando usuários");

    const usuarios = await usuarioDAO.listarTodos();

    usuarios.forEach((usuario) => {
      console.log(
        `ID: ${usuario.id} | ${usuario.nome} | ${usuario.email}`
      );
    });

    // ==========================
    // LIVROS
    // ==========================

    secao("Criando livros");

    const livro1 = await livroDAO.criar({
      titulo: "O Guia do Mochileiro das Galáxias",
      autor: "Douglas Adams",
      genero: "Sci-Fi",
      anoPublicacao: 1979,
      sinopse:
        "Após a destruição da Terra, Arthur Dent embarca em uma jornada espacial repleta de humor.",
      usuarioId: comumId,
    });

    const livro2 = await livroDAO.criar({
      titulo: "Dom Casmurro",
      autor: "Machado de Assis",
      genero: "Romance",
      anoPublicacao: 1899,
      sinopse:
        "Bentinho relembra sua história com Capitu, marcada por amor, ciúme e dúvidas.",
      usuarioId: comumId,
    });

    console.log(`Livro criado: ${livro1.id} | ${livro1.titulo}`);
    console.log(`Livro criado: ${livro2.id} | ${livro2.titulo}`);

    secao("Buscando livro por ID");

    const encontrado = await livroDAO.buscarPorId(livro1.id);

    if (encontrado) {
      console.log(
        `${encontrado.titulo} (${encontrado.anoPublicacao})`
      );
    }

    secao("Pesquisando livros");

    const pesquisa = await livroDAO.pesquisar(
      comumId,
      "Machado"
    );

    pesquisa.forEach((livro) => {
      console.log(
        `${livro.titulo} | ${livro.autor}`
      );
    });

    secao("Listando livros");

    const livros = await livroDAO.listarTodos();

    livros.forEach((livro) => {
      console.log(
        `ID: ${livro.id} | ${livro.titulo} | ${livro.autor}`
      );
    });

    secao("Atualizando livro");

    await livroDAO.atualizar(livro1.id, {
      anoPublicacao: 1980,
      sinopse:
        "Nova sinopse: a viagem mais engraçada do universo."
    });

    const atualizado = await livroDAO.buscarPorId(livro1.id);

    console.log(
      `Atualizado: ${atualizado?.titulo} | ${atualizado?.anoPublicacao}`
    );

    secao("Removendo livro");

    await livroDAO.remover(livro2.id);

    const removido = await livroDAO.buscarPorId(livro2.id);

    console.log(
      removido
        ? "Falha ao remover."
        : "Livro removido com sucesso."
    );

    secao("Livros restantes");

    const restantes = await livroDAO.listarTodos();

    restantes.forEach((livro) => {
      console.log(
        `${livro.id} | ${livro.titulo} (${livro.anoPublicacao})`
      );
    });

    console.log("\n✅ CRUD executado com sucesso!");
  } catch (error) {
    console.error("\n❌ Erro durante execução:");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();