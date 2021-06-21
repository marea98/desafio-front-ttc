import { IClassification } from "./IClassification";

export interface IAdhered {
    codigo: string,
    prefixo: string,
    descricao: string,
    vigencia_inicial: string,
    classificacao: IClassification[],
    ativo: string,
    frequencia_pesquisa: string,
    carencia_do_falso_foco: string,
}
