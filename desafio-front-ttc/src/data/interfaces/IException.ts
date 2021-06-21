import { IClassification } from "./IClassification";

export interface IException {
    codigo: string,
    codigo_aderido: string
    nome_unidade: string,
    prefixo: string,
    classificacao: IClassification[],
}