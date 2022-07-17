import { Startups } from 'app/entities/startups/startups.model';

export class Inscripciones {
  constructor(
    public nombre: string,
    public descripcion: string,
    public monto: number,
    public tipo: string,
    public fechaInicial: String | null,
    public fechaFinal: string | null,
    public beneficios: string,
    public estado: string,
    public numInscripcion: number,
    public idStartup: Startups
  ) {}
}
