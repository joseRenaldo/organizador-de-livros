import { prisma } from "../config/database";
import { Prisma } from "../../generated/prisma/client";
import { Livro } from "../dominio/Livro";

export class LivroDAO {
  async criar(livro: Livro): Promise<Livro> {
    const registro = await prisma.livro.create({
      data: {
        titulo: livro.titulo,
        autor: livro.autor,
        genero: livro.genero,
        anoPublicacao: livro.anoPublicacao,
        sinopse: livro.sinopse,
        usuarioId: livro.usuarioId,
      },
    });

    return this.mapearParaDominio(registro);
  }

  async pesquisar(usuarioId: number, termo: string): Promise<Livro[]> {
    const registros = await prisma.livro.findMany({
      where: {
        usuarioId: usuarioId,
        OR: [
          { titulo: { contains: termo } },
          { autor: { contains: termo } },
          { genero: { contains: termo } },
        ],
      },
    });

    return registros.map((registro) => this.mapearParaDominio(registro));
  }

  async listarTodos(): Promise<Livro[]> {
    const registros = await prisma.livro.findMany();
    return registros.map((registro) => this.mapearParaDominio(registro));
  }

  async buscarPorId(id: number): Promise<Livro | null> {
    const registro = await prisma.livro.findUnique({ where: { id } });
    return registro ? this.mapearParaDominio(registro) : null;
  }

  async atualizar(id: number, dados: Prisma.LivroUpdateInput): Promise<Livro> {
    const registro = await prisma.livro.update({ where: { id }, data: dados });
    return this.mapearParaDominio(registro);
  }

  async remover(id: number) {
    await prisma.livro.delete({ where: { id } });
    return true;
  }

  private mapearParaDominio(registro: any): Livro {
    return new Livro(
      registro.titulo,
      registro.autor,
      registro.genero,
      registro.anoPublicacao,
      registro.sinopse,
      registro.usuarioId,
      registro.id,
    );
  }
}
