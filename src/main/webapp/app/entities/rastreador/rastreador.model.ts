import dayjs from 'dayjs/esm';
import { IDonacionesPaquetes } from 'app/entities/donaciones-paquetes/donaciones-paquetes.model';

export interface IRastreador {
  id?: number;
  descripcion?: string | null;
  latitud?: string | null;
  longitud?: string | null;
  fecha?: dayjs.Dayjs | null;
  estado?: string | null;
  idDonacionPaquete?: IDonacionesPaquetes | null;
}

export class Rastreador implements IRastreador {
  constructor(
    public id?: number,
    public descripcion?: string | null,
    public latitud?: string | null,
    public longitud?: string | null,
    public fecha?: dayjs.Dayjs | null,
    public estado?: string | null,
    public idDonacionPaquete?: IDonacionesPaquetes | null
  ) {}
}

export function getRastreadorIdentifier(rastreador: IRastreador): number | undefined {
  return rastreador.id;
}
