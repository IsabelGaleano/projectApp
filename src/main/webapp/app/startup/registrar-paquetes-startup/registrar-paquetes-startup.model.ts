import { IStartups } from 'app/entities/startups/startups.model';

export class Paquetes {
  constructor(
    public id?: number,
    public nombre?: string | null,
    public monto?: number | null,
    public descripcion?: string | null,
    public dimensiones?: string | null,
    public estado?: string | null,
    public idStartup?: IStartups | null
  ) {}
}
