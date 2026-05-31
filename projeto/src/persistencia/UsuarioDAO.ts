import { prisma } from "../config/database";
import { Prisma } from "../../generated/prisma/client";
import { Usuario, UsuarioAdm, UsuarioComum } from "../dominio/Usuario";

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
    const registro = await prisma.usuario.findUnique({ where: { email } });
    return registro ? this.mapearParaDominio(registro) : null;
  }

  async buscarPorId(id: number): Promise<Usuario | null> {
    const registro = await prisma.usuario.findUnique({ where: { id } });
    return registro ? this.mapearParaDominio(registro) : null;
  }

  async listarTodos(): Promise<Usuario[]> {
    const registro = await prisma.usuario.findMany();
    return registro.map((r) => this.mapearParaDominio(r));
  }

  private mapearParaDominio(registro: any): Usuario {
    const { id, nome, email, senha, dataNascimento, tipo } = registro;
    if (tipo === "ADM") {
      return new UsuarioAdm(nome, email, senha, dataNascimento, id);
    } else {
      return new UsuarioComum(nome, email, senha, dataNascimento, id);
    }
  }
}
