import { IPais } from "./pais";

export interface IEstado {
  id?: number;
  nome?: string;
  sigla?: string;
  pais?: IPais;
}

export class Estado implements IEstado {
  constructor(
    public id?: number,
    public nome?: string,
    public sigla?: string,
    public pais?: IPais
  ) {
  }
}

export function getEstadoIdentifier(estado:IEstado): number | undefined {
    return estado.id;
}
