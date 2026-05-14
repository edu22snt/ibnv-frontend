import { IMembro } from "./membro";

export interface INotaFiscal {
    id: number;
    nomeArquivo: string;
    tipoArquivo: string;
    caminhoImagem: string;

}

export class NotaFiscal implements INotaFiscal {
    constructor(
        public id: number,
        public nomeArquivo: string,
        public tipoArquivo: string,
        public caminhoImagem: string
    ) {}
}

export function getNotaFiscalIdentifier(notaFiscal: INotaFiscal): number | undefined {
    return notaFiscal.id;
}
