import dayjs from 'dayjs/esm';
import { IDonacionesPaquetes } from 'app/entities/donaciones-paquetes/donaciones-paquetes.model';
import { IStartups } from 'app/entities/startups/startups.model';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';

export interface IFacturas {
  id?: number;
  monto?: number | null;
  descripcion?: string | null;
  fecha?: dayjs.Dayjs | null;
  impuesto?: number | null;
  adicional?: number | null;
  nombreReceptor?: string | null;
  apellidoReceptor?: string | null;
  correoReceptor?: string | null;
  nombreStartup?: string | null;
  correoStartup?: string | null;
  estado?: string | null;
  idDonacionPaquete?: IDonacionesPaquetes | null;
  idStartup?: IStartups | null;
  idUsuario?: IUsuarios | null;
}

export class Facturas implements IFacturas {
  constructor(
    public id?: number,
    public monto?: number | null,
    public descripcion?: string | null,
    public fecha?: dayjs.Dayjs | null,
    public impuesto?: number | null,
    public adicional?: number | null,
    public nombreReceptor?: string | null,
    public apellidoReceptor?: string | null,
    public correoReceptor?: string | null,
    public nombreStartup?: string | null,
    public correoStartup?: string | null,
    public estado?: string | null,
    public idDonacionPaquete?: IDonacionesPaquetes | null,
    public idStartup?: IStartups | null,
    public idUsuario?: IUsuarios | null
  ) {}
}

export function getFacturasIdentifier(facturas: IFacturas): number | undefined {
  return facturas.id;
}
