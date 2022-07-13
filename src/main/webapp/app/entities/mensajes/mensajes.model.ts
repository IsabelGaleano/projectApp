import dayjs from 'dayjs/esm';
import { IStartups } from 'app/entities/startups/startups.model';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';

export interface IMensajes {
  id?: number;
  mensaje?: string | null;
  fecha?: dayjs.Dayjs | null;
  tipoRemitente?: string | null;
  tipoReceptor?: string | null;
  estado?: string | null;
  idStartup?: IStartups | null;
  idUsuario?: IUsuarios | null;
}

export class Mensajes implements IMensajes {
  constructor(
    public id?: number,
    public mensaje?: string | null,
    public fecha?: dayjs.Dayjs | null,
    public tipoRemitente?: string | null,
    public tipoReceptor?: string | null,
    public estado?: string | null,
    public idStartup?: IStartups | null,
    public idUsuario?: IUsuarios | null
  ) {}
}

export function getMensajesIdentifier(mensajes: IMensajes): number | undefined {
  return mensajes.id;
}
