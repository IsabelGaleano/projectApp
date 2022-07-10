import dayjs from 'dayjs/esm';
import { IStartups } from 'app/entities/startups/startups.model';

export interface IInscripciones {
  id?: number;
  nombre?: string;
  descripcion?: string | null;
  monto?: number | null;
  tipo?: string | null;
  fechaInicial?: dayjs.Dayjs | null;
  fechaFinal?: dayjs.Dayjs | null;
  beneficios?: string | null;
  estado?: string | null;
  numInscripcion?: number | null;
  idStartup?: IStartups | null;
}

export class Inscripciones implements IInscripciones {
  constructor(
    public id?: number,
    public nombre?: string,
    public descripcion?: string | null,
    public monto?: number | null,
    public tipo?: string | null,
    public fechaInicial?: dayjs.Dayjs | null,
    public fechaFinal?: dayjs.Dayjs | null,
    public beneficios?: string | null,
    public estado?: string | null,
    public numInscripcion?: number | null,
    public idStartup?: IStartups | null
  ) {}
}

export function getInscripcionesIdentifier(inscripciones: IInscripciones): number | undefined {
  return inscripciones.id;
}
