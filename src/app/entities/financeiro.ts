import { IMembro } from "./membro";

export interface IFinanceiro {
    id: number;
    tipo: string;
    categoria: string;
    valor: number;
    data: string;
    descricao: string;
    membro: IMembro;
}

export class Financeiro implements IFinanceiro {
    constructor(
        public id: number,
        public tipo: string,
        public categoria: string,
        public valor: number,
        public data: string,
        public descricao: string,
        public membro: IMembro
    ) {}
}

export function getFinanceiroIdentifier(finance: IFinanceiro): number | undefined {
    return finance.id;
}
