
export class Livro {
  #id?: number;
  #titulo!: string;
  #autor!: string;
  #genero!: string;
  #anoPublicacao!: number;
  #sinopse!: string;
  #usuarioId!: number;

  constructor(
    titulo: string,
    autor: string,
    genero: string,
    anoPublicacao: number,
    sinopse: string,
    usuarioId: number,
    id?: number,
  ) {
    this.setTitulo(titulo);
    this.setAutor(autor);
    this.setGenero(genero);
    this.setAnoPublicacao(anoPublicacao);
    this.setSinopse(sinopse);
    this.setUsuarioId(usuarioId);
    this.#id = id;
  }

  get id() {
    return this.#id;
  }
  get titulo() {
    return this.#titulo;
  }
  get autor() {
    return this.#autor;
  }
  get genero() {
    return this.#genero;
  }
  get anoPublicacao() {
    return this.#anoPublicacao;
  }
  get sinopse() {
    return this.#sinopse;
  }
  get usuarioId() {
    return this.#usuarioId;
  }

  setTitulo(titulo: string) {
    if (!titulo || titulo.trim().length < 2) {
      throw new Error("O título do livro deve conter ao menos dois caracteres");
    }
    this.#titulo = titulo.trim();
  }

  setAutor(autor: string) {
    if (!autor || autor.trim().length < 2) {
      throw new Error("O nome do autor deve ter ao menos dois caracteres");
    }
    this.#autor = autor.trim();
  }

  setGenero(genero: string) {
    const generosValidos = [
      "ficção", "romance", "terror", "biografia",
      "fantasia", "história", "sci-fi"
    ];
    const generoNormalizado = genero.trim().toLowerCase();
    if (!generosValidos.includes(generoNormalizado)) {
      throw new Error("Gênero inválido. Opções: Ficção, Romance, Terror, Biografia, Fantasia, História, sci-fi");
    }
    this.#genero = genero.trim();
  }

  setAnoPublicacao(ano: number) {
    const anoAtual = new Date().getFullYear();
    if (isNaN(ano) || ano < 1000 || ano > anoAtual) {
      throw new Error(`O ano de publicação deve ser maior que 1000 e menor que ${anoAtual}`);
    }
    this.#anoPublicacao = ano;
  }

  setSinopse(sinopse: string) {
    if (!sinopse || sinopse.trim().length < 10) {
      throw new Error("A sinopse precisa de uma descrição de mais de 10 caracteres");
    }
    this.#sinopse = sinopse.trim();
  }

  setUsuarioId(usuarioId: number) {
    if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
      throw new Error("O usuário do livro deve ser um ID válido");
    }
    this.#usuarioId = usuarioId;
  }
}
