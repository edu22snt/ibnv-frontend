import { IEndereco } from "./endereco";

export interface IMembro {
  id?: number;
  nome?: string;
  email?: string;
  telefone?: string;
  dataNascimento?: Date;
  sexo?: string;
  estadoCivil?: string;
  endereco?: IEndereco;
  ativo?: number;
  dataCadastro?: Date;
  dataBatismo?: Date;
}

export class Membro implements IMembro {
    constructor(
        public id?: number,
        public nome?: string,
        public email?: string,
        public telefone?: string,
        public dataNascimento?: Date,
        public sexo?: string,
        public estadoCivil?: string,
        public endereco?: IEndereco,
        public ativo?: number,
        public dataCadastro?: Date,
        public dataBatismo?: Date
    ) {}
}

export function getMembroIdentifier(membro:IMembro): number | undefined {
    return membro.id;
}