import { IMembro } from "./membro";
import { INotaFiscal } from "./nota-fiscal";

export interface IFinanceiro {
    id: number;
    tipo: string;
    categoria: string;
    valor: number;
    data: string;
    descricao: string;
    membro: IMembro;
    notaFiscal?: INotaFiscal;
}

export class Financeiro implements IFinanceiro {
    constructor(
        public id: number,
        public tipo: string,
        public categoria: string,
        public valor: number,
        public data: string,
        public descricao: string,
        public membro: IMembro,
        public notaFiscal?: INotaFiscal
    ) {}
}

export function getFinanceiroIdentifier(finance: IFinanceiro): number | undefined {
    return finance.id;
}
