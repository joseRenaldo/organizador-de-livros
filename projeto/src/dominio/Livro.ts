export class Livro {
  private _id?: number;
  private _titulo!: string;
  private _autor!: string;
  private _genero!: string;
  private _anoPublicacao!: number;
  private _sinopse!: string;
  private _usuarioId!: number;

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
    this._id = id;
  }

  get id() { return this._id; }
  get titulo() { return this._titulo; }
  get autor() { return this._autor; }
  get genero() { return this._genero; }
  get anoPublicacao() { return this._anoPublicacao; }
  get sinopse() { return this._sinopse; }
  get usuarioId() { return this._usuarioId; }

  setTitulo(titulo: string) {
    if (!titulo || titulo.trim().length < 2) {
      throw new Error("O título do livro deve conter ao menos dois caracteres");
    }
    this._titulo = titulo.trim();
  }

  setAutor(autor: string) {
    if (!autor || autor.trim().length < 2) {
      throw new Error("O nome do autor deve ter ao menos dois caracteres");
    }
    this._autor = autor.trim();
  }

  setGenero(genero: string) {
    const generosValidos = ["ficção", "romance", "terror", "biografia", "fantasia", "história", "sci-fi"];
    const generoNormalizado = genero.trim().toLowerCase();
    if (!generosValidos.includes(generoNormalizado)) {
      throw new Error("Gênero inválido. Opções: Ficção, Romance, Terror, Biografia, Fantasia, História, sci-fi");
    }
    this._genero = genero.trim();
  }

  setAnoPublicacao(ano: number) {
    const anoAtual = new Date().getFullYear();
    if (isNaN(ano) || ano < 1000 || ano > anoAtual) {
      throw new Error(`O ano de publicação deve ser de 1000 D.C. até o ano atual`);
    }else{
    this._anoPublicacao = ano;}
  }

  setSinopse(sinopse: string) {
    this._sinopse = sinopse;
  }

  setUsuarioId(usuarioId: number) {
    this._usuarioId = usuarioId;
  }
}