export interface IEvento {
    id: number;
    nome: string;
    data: string;
    tipo: string;
    descricao: string;
}

export class Evento implements IEvento {
    constructor(
        public id: number,
        public nome: string,
        public data: string,
        public tipo: string,
        public descricao: string
    ) {}
}

export function getEventoIdentifier(evento: IEvento): number | undefined {
    return evento.id;
}
