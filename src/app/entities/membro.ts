import { IEndereco } from "./endereco";

export interface IMembro {
  id?: number;
  nome?: string;
  liderDireto?: string;
  email?: string;
  numTelefone?: string;
  dataNascimento?: Date;
  sexo?: string;
  estadoCivil?: string;
  endereco?: IEndereco;
  ativo?: number;
  dataCadastro?: Date;
  dataBatismo?: Date;
  lider?: boolean;
}

export class Membro implements IMembro {
    constructor(
        public id?: number,
        public nome?: string,
        public liderDireto?: string,
        public email?: string,
        public numTelefone?: string,
        public dataNascimento?: Date,
        public sexo?: string,
        public estadoCivil?: string,
        public endereco?: IEndereco,
        public ativo?: number,
        public dataCadastro?: Date,
        public dataBatismo?: Date,
        public lider?: boolean
    ) {}
}

export function getMembroIdentifier(membro:IMembro): number | undefined {
    return membro.id;
}