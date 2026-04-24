
export interface IEndereco {
  id?: number;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  pais?: string;
}

export class Endereco implements IEndereco {
  constructor(
    public id?: number,
    public logradouro?: string,
    public numero?: string,
    public complemento?: string,
    public bairro?: string,
    public cidade?: string,
    public estado?: string,
    public cep?: string,
    public pais?: string
  ) {
  }
}

export function getEnderecoIdentifier(endereco:IEndereco): number | undefined {
    return endereco.id;
}
