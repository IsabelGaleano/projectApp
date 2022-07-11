import { IDocumentos } from 'app/entities/documentos/documentos.model';
import { IDonacionesPaquetes } from 'app/entities/donaciones-paquetes/donaciones-paquetes.model';
import { IStartups } from 'app/entities/startups/startups.model';

export interface IPaquetes {
  id?: number;
  nombre?: string | null;
  monto?: number | null;
  descripcion?: string | null;
  dimensiones?: string | null;
  estado?: string | null;
  documentos?: IDocumentos[] | null;
  donacionesPaquetes?: IDonacionesPaquetes[] | null;
  idStartup?: IStartups | null;
}

export class Paquetes implements IPaquetes {
  constructor(
    public id?: number,
    public nombre?: string | null,
    public monto?: number | null,
    public descripcion?: string | null,
    public dimensiones?: string | null,
    public estado?: string | null,
    public documentos?: IDocumentos[] | null,
    public donacionesPaquetes?: IDonacionesPaquetes[] | null,
    public idStartup?: IStartups | null
  ) {}
}

export function getPaquetesIdentifier(paquetes: IPaquetes): number | undefined {
  return paquetes.id;
}
