import { IStartups } from 'app/entities/startups/startups.model';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';

export interface ICodigos {
  id?: number;
  codigo?: string | null;
  estado?: string | null;
  idStartup?: IStartups | null;
  idUsuario?: IUsuarios | null;
}

export class Codigos implements ICodigos {
  constructor(
    public id?: number,
    public codigo?: string | null,
    public estado?: string | null,
    public idStartup?: IStartups | null,
    public idUsuario?: IUsuarios | null
  ) {}
}

export function getCodigosIdentifier(codigos: ICodigos): number | undefined {
  return codigos.id;
}
