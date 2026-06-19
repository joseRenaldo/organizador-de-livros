import "dotenv/config";
import { Client } from "minio";

const endpointMinio = process.env.MINIO_ENDPOINT ?? "localhost";
const portaMinio = Number(process.env.MINIO_PORT ?? 9000);
const usarSSL = String(process.env.MINIO_USE_SSL ?? "false").toLowerCase() === "true";
const chaveAcesso = process.env.MINIO_ACCESS_KEY ?? "minioadmin";
const chaveSecreta = process.env.MINIO_SECRET_KEY ?? "minioadmin";
const nomeBucket = process.env.MINIO_BUCKET ?? "livros";

export const clienteMinio = new Client({
  endPoint: endpointMinio,
  port: portaMinio,
  useSSL: usarSSL,
  accessKey: chaveAcesso,
  secretKey: chaveSecreta,
});

export async function garantirBucketExiste() {
  const existe = await clienteMinio.bucketExists(nomeBucket);
  if (!existe) {
    await clienteMinio.makeBucket(nomeBucket);
  }
  return nomeBucket;
}

export { nomeBucket };
