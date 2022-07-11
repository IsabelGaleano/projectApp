import dayjs from 'dayjs/esm';
import { IMonederos } from 'app/entities/monederos/monederos.model';
import { IVotos } from 'app/entities/votos/votos.model';
import { IComentarios } from 'app/entities/comentarios/comentarios.model';
import { IMensajes } from 'app/entities/mensajes/mensajes.model';
import { ICodigos } from 'app/entities/codigos/codigos.model';
import { IFacturas } from 'app/entities/facturas/facturas.model';
import { IReuniones } from 'app/entities/reuniones/reuniones.model';
import { IDocumentos } from 'app/entities/documentos/documentos.model';
import { IDonacionesPaquetes } from 'app/entities/donaciones-paquetes/donaciones-paquetes.model';
import { INotificaciones } from 'app/entities/notificaciones/notificaciones.model';
import { IRolesUsuarios } from 'app/entities/roles-usuarios/roles-usuarios.model';

export interface IUsuarios {
  id?: number;
  nombre?: string;
  cedula?: string | null;
  primerApellido?: string | null;
  segundoApellido?: string | null;
  correoElectronico?: string;
  genero?: string | null;
  telefono?: string | null;
  fechaNacimiento?: dayjs.Dayjs | null;
  latitudDireccion?: string | null;
  longitudDireccion?: string | null;
  imagenURL?: string | null;
  tipoUsuarioFinal?: string | null;
  contrasennia?: string | null;
  estado?: string | null;
  idMonedero?: IMonederos | null;
  votos?: IVotos[] | null;
  comentarios?: IComentarios[] | null;
  mensajes?: IMensajes[] | null;
  codigos?: ICodigos[] | null;
  facturas?: IFacturas[] | null;
  reuniones?: IReuniones[] | null;
  documentos?: IDocumentos[] | null;
  donacionesPaquetes?: IDonacionesPaquetes[] | null;
  notificaciones?: INotificaciones[] | null;
  idRol?: IRolesUsuarios | null;
}

export class Usuarios implements IUsuarios {
  constructor(
    public id?: number,
    public nombre?: string,
    public cedula?: string | null,
    public primerApellido?: string | null,
    public segundoApellido?: string | null,
    public correoElectronico?: string,
    public genero?: string | null,
    public telefono?: string | null,
    public fechaNacimiento?: dayjs.Dayjs | null,
    public latitudDireccion?: string | null,
    public longitudDireccion?: string | null,
    public imagenURL?: string | null,
    public tipoUsuarioFinal?: string | null,
    public contrasennia?: string | null,
    public estado?: string | null,
    public idMonedero?: IMonederos | null,
    public votos?: IVotos[] | null,
    public comentarios?: IComentarios[] | null,
    public mensajes?: IMensajes[] | null,
    public codigos?: ICodigos[] | null,
    public facturas?: IFacturas[] | null,
    public reuniones?: IReuniones[] | null,
    public documentos?: IDocumentos[] | null,
    public donacionesPaquetes?: IDonacionesPaquetes[] | null,
    public notificaciones?: INotificaciones[] | null,
    public idRol?: IRolesUsuarios | null
  ) {}
}

export function getUsuariosIdentifier(usuarios: IUsuarios): number | undefined {
  return usuarios.id;
}
