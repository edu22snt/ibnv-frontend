import { IMembro } from "./membro";

export interface IMinisterio {
    id: number;
    nome: string;
    tipo: string;
    lider: IMembro;
}

export class Ministerio implements IMinisterio {
    constructor(
        public id: number,
        public nome: string,
        public tipo: string,
        public lider: IMembro
    ) {}
}

export function getMinisterioIdentifier(ministerio: IMinisterio): number | undefined {
    return ministerio.id;
}
