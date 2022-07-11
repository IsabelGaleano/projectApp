import dayjs from 'dayjs/esm';
import { IStartups } from 'app/entities/startups/startups.model';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';

export interface IReuniones {
  id?: number;
  url?: string | null;
  descripcion?: string | null;
  fechaSolicitada?: dayjs.Dayjs | null;
  fechaReunion?: dayjs.Dayjs | null;
  horaReunion?: dayjs.Dayjs | null;
  estado?: string | null;
  idStartup?: IStartups | null;
  idUsuario?: IUsuarios | null;
}

export class Reuniones implements IReuniones {
  constructor(
    public id?: number,
    public url?: string | null,
    public descripcion?: string | null,
    public fechaSolicitada?: dayjs.Dayjs | null,
    public fechaReunion?: dayjs.Dayjs | null,
    public horaReunion?: dayjs.Dayjs | null,
    public estado?: string | null,
    public idStartup?: IStartups | null,
    public idUsuario?: IUsuarios | null
  ) {}
}

export function getReunionesIdentifier(reuniones: IReuniones): number | undefined {
  return reuniones.id;
}
