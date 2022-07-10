import { IMovimientos } from 'app/entities/movimientos/movimientos.model';

export interface IMonederos {
  id?: number;
  tipo?: string | null;
  saldo?: number | null;
  estado?: string | null;
  movimientos?: IMovimientos[] | null;
}

export class Monederos implements IMonederos {
  constructor(
    public id?: number,
    public tipo?: string | null,
    public saldo?: number | null,
    public estado?: string | null,
    public movimientos?: IMovimientos[] | null
  ) {}
}

export function getMonederosIdentifier(monederos: IMonederos): number | undefined {
  return monederos.id;
}
