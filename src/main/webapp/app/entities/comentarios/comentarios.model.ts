import dayjs from 'dayjs/esm';
import { IStartups } from 'app/entities/startups/startups.model';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';

export interface IComentarios {
  id?: number;
  comentario?: string | null;
  estado?: string | null;
  fecha?: dayjs.Dayjs | null;
  idStartup?: IStartups | null;
  idUsuario?: IUsuarios | null;
}

export class Comentarios implements IComentarios {
  constructor(
    public id?: number,
    public comentario?: string | null,
    public estado?: string | null,
    public fecha?: dayjs.Dayjs | null,
    public idStartup?: IStartups | null,
    public idUsuario?: IUsuarios | null
  ) {}
}

export function getComentariosIdentifier(comentarios: IComentarios): number | undefined {
  return comentarios.id;
}
