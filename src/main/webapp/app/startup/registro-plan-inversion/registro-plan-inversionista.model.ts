import { Startups } from 'app/entities/startups/startups.model';

export class PlanesInversion {
  constructor(
    public nombre: string,
    public monto: number,
    public descripcion: string,
    public porcentaje_empresarial: string,
    public estado: string,
    public idStartup: Startups
  ) {}
}
