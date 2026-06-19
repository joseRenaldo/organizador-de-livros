import { clienteMinio, nomeBucket, garantirBucketExiste } from "../config/minio";

export class ServicoMinio {
  static async enviarCapaLivro(livroId: number, arquivo: any) {
    await garantirBucketExiste();

    const nomeObjeto = ServicoMinio.obterNomeObjeto(livroId);
    await clienteMinio.putObject(nomeBucket, nomeObjeto, arquivo.buffer, arquivo.size, {
      "Content-Type": arquivo.mimetype,
    });

    return nomeObjeto;
  }

  static async obterUrlCapaPresignada(livroId: number, expiracaoSegundos = 24 * 60 * 60) {
    await garantirBucketExiste();

    const nomeObjeto = ServicoMinio.obterNomeObjeto(livroId);
    await clienteMinio.statObject(nomeBucket, nomeObjeto);

    return clienteMinio.presignedGetObject(nomeBucket, nomeObjeto, expiracaoSegundos);
  }

  static obterNomeObjeto(livroId: number) {
    return `capas/${livroId}`;
  }
}
