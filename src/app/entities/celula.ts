import { IEndereco } from "./endereco";
import { IMembro } from "./membro";

export interface ICelula {
    id: number;
    nome: string;
    lideres: IMembro[];
    endereco: IEndereco;
    diaSemana: string;
    horario: string;
    anfitriao: string;
}

export class Celula implements ICelula {
    constructor(
        public id: number,
        public nome: string,
        public lideres: IMembro[],
        public endereco: IEndereco,
        public diaSemana: string,
        public horario: string,
        public anfitriao: string
    ) {}
}

export function getCelulaIdentifier(celula: ICelula): number | undefined {
    return celula.id;
}
