import { prisma } from "../config/database";
import { Prisma } from "../../generated/prisma/client";

export class LivroDAO {
  async criar(dados: Prisma.LivroCreateInput) {
    return prisma.livro.create({ data: dados });
  }

  async pesquisar(usuarioId: number, termo: string) {
    return prisma.livro.findMany({
      where: {
        usuarioId: usuarioId,
        OR: [
          { titulo: { contains: termo } },
          { autor: { contains: termo } },
          { genero: { contains: termo } },
        ],
      },
    });
  }

  async buscarPorId(id: number) {
    return prisma.livro.findUnique({ where: { id } });
  }

  async atualizar(id: number, dados: Prisma.LivroUpdateInput) {
    return prisma.livro.update({ where: { id }, data: dados });
  }

  async remover(id: number) {
    await prisma.livro.delete({ where: { id } });
    return true
  }
}