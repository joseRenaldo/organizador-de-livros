export class Livro {
  #id?: number;
  #titulo!: string;
  #autor!: string;
  #genero!: string;
  #anoPublicacao!: number;
  #sinopse!: string;

  constructor(
    titulo: string,
    autor: string,
    genero: string,
    anoPublicacao: number,
    sinopse: string,
    id?: number,
  ) {
    this.setTitulo(titulo);
    this.setAutor(autor);
    this.setGenero(genero);
    this.setAnoPublicacao(anoPublicacao);
    this.setSinopse(sinopse);
    this.#id = id;
  }

  get id() {
    return this.#id;
  }

  get titulo() {
    return this.#titulo;
  }
  setTitulo(nome: string) {
    if (!nome || nome.trim().length < 2) {
      throw new Error("O título do livro deve conter ao menos dois caracterws");
    }
    this.#titulo = nome;
  }

  get autor() {
    return this.#autor;
  }
  setAutor(nome: string) {
    if (!nome || nome.trim().length < 2) {
      throw new Error("O nome deve ter ao menos dois caracteres");
    }
    this.#autor = nome;
  }

  get genero() {
    return this.#genero;
  }
  setGenero(genero: string) {
    const generosValidos = [
      "Ficção",
      "Romance",
      "Terror",
      "Biografia",
      "Fantasia",
      "História",
      "sci-fi",
    ];
    if (!generosValidos.includes(genero)) {
      throw new Error("G");
    }
  }

  get anoPublicacao() {
    return this.#anoPublicacao;
  }
  setAnoPublicacao(ano: number) {
    const anoAtual = new Date().getFullYear();
    if (isNaN(ano) || ano < 1000 || ano > anoAtual) {
      throw new Error(
        `O ano de publicação deve ser maior que 1000 e menor que ${anoAtual}`,
      );
    }
    this.#anoPublicacao = ano;
  }

  get sinopse() {
    return this.#sinopse;
  }
  setSinopse(texto: string) {
    if (!texto || texto.trim().length < 10) {
      throw new Error(
        "A sniopse precisa de uma descrição de mais de 10 caracteres",
      );
    }
    this.#sinopse = texto;
  }
}
