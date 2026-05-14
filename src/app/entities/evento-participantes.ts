import { IEvento } from "./evento";

export interface IEventoParticipantes {
    id: number;
    nome: string;
    email: string;
    numTelefone: string;
    evento: IEvento;
}

export class EventoParticipantes implements IEventoParticipantes {
    constructor(
        public id: number,
        public nome: string,
        public email: string,
        public numTelefone: string,
        public evento: IEvento  
    ) {}
}

export function getEventoIdentifier(eventoParticipantes: IEventoParticipantes): number | undefined {
    return eventoParticipantes.id;
}
