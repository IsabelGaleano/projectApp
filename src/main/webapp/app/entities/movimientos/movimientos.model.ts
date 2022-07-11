import dayjs from 'dayjs/esm';
import { IMonederos } from 'app/entities/monederos/monederos.model';

export interface IMovimientos {
  id?: number;
  fecha?: dayjs.Dayjs | null;
  monto?: number | null;
  tipo?: string | null;
  descripcion?: string | null;
  estado?: string | null;
  idMonedero?: IMonederos | null;
}

export class Movimientos implements IMovimientos {
  constructor(
    public id?: number,
    public fecha?: dayjs.Dayjs | null,
    public monto?: number | null,
    public tipo?: string | null,
    public descripcion?: string | null,
    public estado?: string | null,
    public idMonedero?: IMonederos | null
  ) {}
}

export function getMovimientosIdentifier(movimientos: IMovimientos): number | undefined {
  return movimientos.id;
}
