import { IStartups } from 'app/entities/startups/startups.model';

export interface IPlanesInversion {
  id?: number;
  nombre?: string | null;
  monto?: number | null;
  descripcion?: string | null;
  beneficios?: string | null;
  porcentajeEmpresarial?: number | null;
  estado?: string | null;
  idStartup?: IStartups | null;
}

export class PlanesInversion implements IPlanesInversion {
  constructor(
    public id?: number,
    public nombre?: string | null,
    public monto?: number | null,
    public descripcion?: string | null,
    public beneficios?: string | null,
    public porcentajeEmpresarial?: number | null,
    public estado?: string | null,
    public idStartup?: IStartups | null
  ) {}
}

export function getPlanesInversionIdentifier(planesInversion: IPlanesInversion): number | undefined {
  return planesInversion.id;
}
