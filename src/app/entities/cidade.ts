import { IEstado } from "./estado";

export interface ICidade  {
  id?: number;
  nome?: string;
  estado?: IEstado;
}

export class Cidade implements ICidade  {
  constructor(
    public id?: number,
    public nome?: string,
    public estado?: IEstado
  ) {
  }
}

export function getCidadeIdentifier(cidade:ICidade ): number | undefined {
    return cidade.id;
}
