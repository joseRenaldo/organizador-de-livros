import { prisma } from "./config/database";
import { Livro } from "./dominio/Livro";
import { LivroDAO } from "./persistencia/LivroDAO";
import { Usuario, UsuarioAdm, UsuarioComum } from "./dominio/Usuario";
import { UsuarioDAO } from "./persistencia/UsuarioDAO";

const usuarioDAO = new UsuarioDAO();
const livroDAO = new LivroDAO();

async function main() {
  console.log("========= Teste ========="); //Por favor da certo que quero jogar um turbinho no Dota

  try {
    console.log("\nCriando usuários");
    const admin = new UsuarioAdm(
      "Primeiro Adm",
      "firstadm@email.com",
      "senha123",
      new Date("1001-03-20"),
    );

    const mortal = new UsuarioComum(
      "Simples humano",
      "simpleshumano@email.com",
      "senha321",
      new Date("2011-08-11"),
    );

    const adminSalvo = await usuarioDAO.criar(admin);
    const mortalSalvo = await usuarioDAO.criar(mortal);

    console.log("Novo admin: ", adminSalvo.nome);
    console.log("Novo mortal: ", mortalSalvo.nome);

    // termino o resto dps, fui jogar Dota, se mexer nessa porra e bagunçar o teste eu te mato, se não tiver bagunçado eu te dou um abraço, valeu?

    console.log("Buscando usuário por email");
    const usuarioEncontrado = await usuarioDAO.buscarPorEmail("simpleshumano@email.com")

    if(usuarioEncontrado) {
      console.log("Encontrado: ", usuarioEncontrado.nome, "| Nível acesso: ", usuarioEncontrado.getNivelAcesso());
    }

    console.log("Listando todos os usuários");
    const lista = await usuarioDAO.listarTodos();


  } catch (error) {
    console.error(error);
  }
}

main();
