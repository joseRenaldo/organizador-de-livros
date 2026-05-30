export abstract class Usuario {
  #id?: number;
  #nome!: string;
  #email!: string;
  #senha!: string;
  #dataNascimento!: Date;

  constructor(
    nome: string,
    email: string,
    senha: string,
    dataNascimento: Date,
    id?: number,
  ) {
    this.setNome(nome);
    this.setEmail(email);
    this.setSenha(senha);
    this.setDataNascimento(dataNascimento);
    this.#id = id;
  }

  get id() {
    return this.#id;
  }
  get nome() {
    return this.#nome;
  }
  get email() {
    return this.#email;
  }
  get senha() {
    return this.#senha;
  }
  get dataNascimento() {
    return this.#dataNascimento;
  }

  setNome(nome: string) {
    if (!nome || nome.trim().length < 2) {
      throw new Error("O nome deve ter pelo menos 2 caracteres");
    }
    this.#nome = nome.trim();
  }

  setEmail(email: string) {
    const emailTrim = email.trim();
    const temArroba = emailTrim.includes("@");
    const temPonto = emailTrim.includes(".");
    const temEspaco = emailTrim.includes(" ");

    if (!temArroba || !temPonto || temEspaco) {
      throw new Error("Email inválido");
    }
    this.#email = emailTrim;
  }

  setSenha(senha: string) {
    if (!senha || senha.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres");
    }
    this.#senha = senha;
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
    this.#dataNascimento = data;
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