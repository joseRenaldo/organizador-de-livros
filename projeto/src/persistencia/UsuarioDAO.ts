import { prisma } from "../config/database";
import { Prisma } from "../../generated/prisma/client";
import { Usuario, UsuarioAdm, UsuarioComum } from "../dominio/Usuario";
import { Livro } from "../dominio/Livro";

export class UsuarioDAO {
  async criar(usuario: Usuario): Promise<Usuario> {
    const dados = {
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      dataNascimento: usuario.dataNascimento,
      tipo: usuario.getNivelAcesso(),
    };

    const registro = await prisma.usuario.create({ data: dados });
    return this.mapearParaDominio(registro);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const registro = await prisma.usuario.findUnique({
      where: { email },
      include: { livros: true },
    });
    return registro ? this.mapearParaDominio(registro) : null;
  }

  async buscarPorId(id: number): Promise<Usuario | null> {
    const registro = await prisma.usuario.findUnique({
      where: { id },
      include: { livros: true },
    });
    return registro ? this.mapearParaDominio(registro) : null;
  }

  async listarTodos(): Promise<Usuario[]> {
    const registro = await prisma.usuario.findMany({ include: { livros: true } });
    return registro.map((r) => this.mapearParaDominio(r));
  }

  async atualizar(usuario: Usuario): Promise<Usuario> {
    if (usuario.id == null) {
      throw new Error("Usuário deve ter um ID para ser atualizado.");
    }
    const dados = {
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      dataNascimento: usuario.dataNascimento,
      tipo: usuario.getNivelAcesso(),
    };

    const registro = await prisma.usuario.update({
      where: { id: usuario.id },
      data: dados,
    });

    return this.mapearParaDominio(registro);
  }

  async deletar(id: number): Promise<boolean> {
    await prisma.usuario.delete({ where: { id } });
    return true;
  }
  private mapearLivros(livros: any[]): Livro[] {
    return livros?.map((livro: any) =>
      new Livro(
        livro.titulo,
        livro.autor,
        livro.genero,
        livro.anoPublicacao,
        livro.sinopse,
        livro.usuarioId,
        livro.id,
      ),
    ) ?? [];
  }

  private mapearParaDominio(registro: any): Usuario {
    const { id, nome, email, senha, dataNascimento, tipo, livros } = registro;
    const livrosDoUsuario = this.mapearLivros(livros || []);

    if (tipo === "ADM") {
      return new UsuarioAdm(nome, email, senha, dataNascimento, id, livrosDoUsuario);
    } else {
      return new UsuarioComum(nome, email, senha, dataNascimento, id, livrosDoUsuario);
    }
  }
}
