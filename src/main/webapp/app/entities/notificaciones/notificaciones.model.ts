import dayjs from 'dayjs/esm';
import { IStartups } from 'app/entities/startups/startups.model';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';

export interface INotificaciones {
  id?: number;
  tipo?: string | null;
  descripcion?: string | null;
  fecha?: dayjs.Dayjs | null;
  tipoRemitente?: string | null;
  tipoReceptor?: string | null;
  estado?: string | null;
  idStartup?: IStartups | null;
  idUsuario?: IUsuarios | null;
}

export class Notificaciones implements INotificaciones {
  constructor(
    public id?: number,
    public tipo?: string | null,
    public descripcion?: string | null,
    public fecha?: dayjs.Dayjs | null,
    public tipoRemitente?: string | null,
    public tipoReceptor?: string | null,
    public estado?: string | null,
    public idStartup?: IStartups | null,
    public idUsuario?: IUsuarios | null
  ) {}
}

export function getNotificacionesIdentifier(notificaciones: INotificaciones): number | undefined {
  return notificaciones.id;
}
