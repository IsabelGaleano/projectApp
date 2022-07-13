import { IStartups } from 'app/entities/startups/startups.model';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';
import { IPaquetes } from 'app/entities/paquetes/paquetes.model';

export interface IDocumentos {
  id?: number;
  nombre?: string | null;
  descripcion?: string | null;
  url?: string | null;
  estado?: string | null;
  idStartup?: IStartups | null;
  idUsuario?: IUsuarios | null;
  idPaquete?: IPaquetes | null;
}

export class Documentos implements IDocumentos {
  constructor(
    public id?: number,
    public nombre?: string | null,
    public descripcion?: string | null,
    public url?: string | null,
    public estado?: string | null,
    public idStartup?: IStartups | null,
    public idUsuario?: IUsuarios | null,
    public idPaquete?: IPaquetes | null
  ) {}
}

export function getDocumentosIdentifier(documentos: IDocumentos): number | undefined {
  return documentos.id;
}
