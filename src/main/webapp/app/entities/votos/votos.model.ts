import dayjs from 'dayjs/esm';
import { IStartups } from 'app/entities/startups/startups.model';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';

export interface IVotos {
  id?: number;
  votos?: number | null;
  estado?: string | null;
  fecha?: dayjs.Dayjs | null;
  idStartup?: IStartups | null;
  idUsuario?: IUsuarios | null;
}

export class Votos implements IVotos {
  constructor(
    public id?: number,
    public votos?: number | null,
    public estado?: string | null,
    public fecha?: dayjs.Dayjs | null,
    public idStartup?: IStartups | null,
    public idUsuario?: IUsuarios | null
  ) {}
}

export function getVotosIdentifier(votos: IVotos): number | undefined {
  return votos.id;
}
