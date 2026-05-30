export abstract class Usuario {
  #id?: number;
  #nome: string;
  #email!: string;
  #senha: string;
  #dataNascimento: Date;

  constructor(
    nome: string,
    email: string,
    senha: string,
    dataNascimento: Date,
    id?: number,
  ) {
    this.#nome = nome;
    this.setEmail(email);
    this.#senha = senha;
    this.#dataNascimento = dataNascimento;
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

  setEmail(email: string) {
    const testeEmail = email.trim();

    const temA = testeEmail.includes("@");
    const temPonto = testeEmail.includes(".");
    const semEspaco = testeEmail.includes(" ");

    if (!temA || !temPonto || !semEspaco) {
      throw new Error("Email inválido");
    }
    this.#email = email;
  }

  abstract getNivelAcasso(): string;
}

export class UsuarioComum extends Usuario{
    getNivelAcasso(): string {
        return "COMUM";
    }
}

export class UsuarioAdm extends Usuario {
    getNivelAcasso(): string {
        return "ADM"
    }
}