import { prisma } from "../config/database";
import { Prisma } from "../../generated/prisma/client";
import { Usuario, UsuarioAdm, UsuarioComum } from "../dominio/Usuario";

export class UsuarioDAO {
  async criar(dados: Prisma.UsuarioCreateInput) {
    return prisma.usuario.create({ data: dados });
  }

  async buscarPorEmail(email: string) {
    return prisma.usuario.findUnique({ where: { email } });
  }

  async buscarPorId(id: number) {
    return prisma.usuario.findUnique({ where: { id } });
  }

  async listarTodos() {
    return prisma.usuario.findMany();
  }

  private mapearParaDominio(registro: any): Usuario {
    if (registro.tipo === "ADM") {
      return new UsuarioAdm(
        registro.nome,
        registro.email,
        registro.senha,
        registro.dataNascimento,
        registro.id,
      );
    } else {
      return new UsuarioComum(
        registro.nome,
        registro.email,
        registro.senha,
        registro.id,
      );
    }
  }
}
