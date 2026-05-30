export class Livro {
  // Atributos privados obrigatórios 
  #id?: number;
  #titulo!: string;
  #autor!: string;
  #genero!: string;
  #anoPublicacao!: number;
  #lido: boolean;
  #sinopse!: string;

  constructor(titulo: string, autor: string, genero: string, anoPublicacao: number, lido: boolean, sinopse: string, id?: number) {
    this.setTitulo(titulo);
    this.setAutor(autor);
    this.setGenero(genero);
    this.setAnoPublicacao(anoPublicacao);
    this.#lido = lido;
    this.setSinopse(sinopse);
    this.#id = id;
  }

  get id() { return this.#id; }

  get titulo() { return this.#titulo; }
  setTitulo(value: string) {
    if (!value || value.trim().length < 2) {
      throw new Error("O título do livro deve conter pelo menos 2 caracteres.");
    }
    this.#titulo = value;
  }

  get autor() { return this.#autor; }
  setAutor(value: string) {
    if (!value || value.trim().length < 2) {
      throw new Error("O nome do autor deve conter pelo menos 2 caracteres.");
    }
    this.#autor = value;
  }

  get genero() { return this.#genero; }
  setGenero(value: string) {
    const generosValidos = ["Ficção", "Romance", "Terror", "Biografia", "Fantasia", "História"];
    if (!generosValidos.includes(value)) {
      throw new Error("Gênero literário selecionado é inválido.");
    }
    this.#genero = value;
  }

  get anoPublicacao() { return this.#anoPublicacao; }
  setAnoPublicacao(value: number) {
    const anoAtual = new Date().getFullYear();
    if (isNaN(value) || value < 1000 || value > anoAtual) {
      throw new Error(`O ano de publicação deve ser um número válido entre 1000 e ${anoAtual}.`);
    }
    this.#anoPublicacao = value;
  }

  get lido() { return this.#lido; }
  set lido(value: boolean) { this.#lido = value; }

  get sinopse() { return this.#sinopse; }
  setSinopse(value: string) {
    if (!value || value.trim().length < 10) {
      throw new Error("A sinopse precisa de uma descrição detalhada (mínimo 10 caracteres).");
    }
    this.#sinopse = value;
  }
}