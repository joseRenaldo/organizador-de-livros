import { Livro } from "./Livro";

export abstract class Usuario {
  // Substituído o '#' nativo pelo 'private' clássico do TypeScript
  private _id?: number;
  private _nome!: string;
  private _email!: string;
  private _senha!: string;
  private _dataNascimento!: Date;
  private _livros: Livro[] = [];

  constructor(
    nome: string,
    email: string,
    senha: string,
    dataNascimento: Date,
    id?: number,
    livros: Livro[] = [],
  ) {
    this.setNome(nome);
    this.setEmail(email);
    this.setSenha(senha);
    this.setDataNascimento(dataNascimento);
    this._id = id;
    this._livros = livros;
  }

  // Getters públicos que o Prisma/Express agora conseguem ler normalmente
  get id() { return this._id; }
  get nome() { return this._nome; }
  get email() { return this._email; }
  get senha() { return this._senha; }
  get dataNascimento() { return this._dataNascimento; }
  get livros() { return this._livros; }

  setNome(nome: string) {
    if (!nome || nome.trim().length < 2) {
      throw new Error("O nome deve ter pelo menos 2 caracteres");
    }
    this._nome = nome.trim();
  }

  setEmail(email: string) {
    const emailTrim = email.trim();
    const temArroba = emailTrim.includes("@");
    const temPonto = emailTrim.includes(".");
    const temEspaco = emailTrim.includes(" ");

    if (!temArroba || !temPonto || temEspaco) {
      throw new Error("Email inválido");
    }
    this._email = emailTrim;
  }

  setSenha(senha: string) {
    if (!senha || senha.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres");
    }
    this._senha = senha;
  }

  setDataNascimento(data: Date) {
    const hoje = new Date();
    const idadeMinima = 12;
    let idade = hoje.getFullYear() - data.getFullYear();
    const mes = hoje.getMonth() - data.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < data.getDate())) {
      idade--;
    }
    if (isNaN(data.getTime()) || data > hoje || idade < idadeMinima) {
      throw new Error(`Data de nascimento inválida (idade mínima: ${idadeMinima} anos)`);
    }
    this._dataNascimento = data;
  }

  abstract getNivelAcesso(): string;
}

export class UsuarioComum extends Usuario {
  getNivelAcesso(): string {
    return "COMUM";
  }
}

export class UsuarioAdm extends Usuario {
  getNivelAcesso(): string {
    return "ADM";
  }
}