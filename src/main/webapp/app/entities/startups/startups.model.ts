import dayjs from 'dayjs/esm';
import { IMonederos } from 'app/entities/monederos/monederos.model';
import { IPlanesInversion } from 'app/entities/planes-inversion/planes-inversion.model';
import { IVotos } from 'app/entities/votos/votos.model';
import { IComentarios } from 'app/entities/comentarios/comentarios.model';
import { IMensajes } from 'app/entities/mensajes/mensajes.model';
import { ICodigos } from 'app/entities/codigos/codigos.model';
import { IFacturas } from 'app/entities/facturas/facturas.model';
import { IReuniones } from 'app/entities/reuniones/reuniones.model';
import { IDocumentos } from 'app/entities/documentos/documentos.model';
import { IPaquetes } from 'app/entities/paquetes/paquetes.model';
import { IDonacionesPaquetes } from 'app/entities/donaciones-paquetes/donaciones-paquetes.model';
import { INotificaciones } from 'app/entities/notificaciones/notificaciones.model';
import { ICategorias } from 'app/entities/categorias/categorias.model';

export interface IStartups {
  id?: number;
  nombreCorto?: string | null;
  nombreLargo?: string | null;
  correoElectronico?: string;
  telefono?: string | null;
  contrasennia?: string | null;
  latitudDireccion?: string | null;
  longitudDireccion?: string | null;
  descripcion?: string | null;
  descripcionCorta?: string | null;
  beneficios?: string | null;
  riesgos?: string | null;
  panoramaMercado?: string | null;
  montoMeta?: number | null;
  tipoMeta?: string | null;
  linkSitioWeb?: string | null;
  imagenURL?: string | null;
  fechaCreacion?: dayjs.Dayjs | null;
  estado?: string | null;
  idMonedero?: IMonederos | null;
  planesInversions?: IPlanesInversion[] | null;
  votos?: IVotos[] | null;
  comentarios?: IComentarios[] | null;
  mensajes?: IMensajes[] | null;
  codigos?: ICodigos[] | null;
  facturas?: IFacturas[] | null;
  reuniones?: IReuniones[] | null;
  documentos?: IDocumentos[] | null;
  paquetes?: IPaquetes[] | null;
  donacionesPaquetes?: IDonacionesPaquetes[] | null;
  notificaciones?: INotificaciones[] | null;
  idCategoria?: ICategorias | null;
}

export class Startups implements IStartups {
  constructor(
    public id?: number,
    public nombreCorto?: string | null,
    public nombreLargo?: string | null,
    public correoElectronico?: string,
    public telefono?: string | null,
    public contrasennia?: string | null,
    public latitudDireccion?: string | null,
    public longitudDireccion?: string | null,
    public descripcion?: string | null,
    public descripcionCorta?: string | null,
    public beneficios?: string | null,
    public riesgos?: string | null,
    public panoramaMercado?: string | null,
    public montoMeta?: number | null,
    public tipoMeta?: string | null,
    public linkSitioWeb?: string | null,
    public imagenURL?: string | null,
    public fechaCreacion?: dayjs.Dayjs | null,
    public estado?: string | null,
    public idMonedero?: IMonederos | null,
    public planesInversions?: IPlanesInversion[] | null,
    public votos?: IVotos[] | null,
    public comentarios?: IComentarios[] | null,
    public mensajes?: IMensajes[] | null,
    public codigos?: ICodigos[] | null,
    public facturas?: IFacturas[] | null,
    public reuniones?: IReuniones[] | null,
    public documentos?: IDocumentos[] | null,
    public paquetes?: IPaquetes[] | null,
    public donacionesPaquetes?: IDonacionesPaquetes[] | null,
    public notificaciones?: INotificaciones[] | null,
    public idCategoria?: ICategorias | null
  ) {}
}

export function getStartupsIdentifier(startups: IStartups): number | undefined {
  return startups.id;
}
