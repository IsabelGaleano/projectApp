import dayjs from 'dayjs/esm';
import { IRastreador } from 'app/entities/rastreador/rastreador.model';
import { IStartups } from 'app/entities/startups/startups.model';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';
import { IPaquetes } from 'app/entities/paquetes/paquetes.model';

export interface IDonacionesPaquetes {
  id?: number;
  descripcion?: string | null;
  montoEnvio?: number | null;
  montoImpuesto?: number | null;
  montoTotal?: number | null;
  fechaDonacion?: dayjs.Dayjs | null;
  fechaEntrega?: dayjs.Dayjs | null;
  fechaPosibleEntrega?: dayjs.Dayjs | null;
  fechaInicialEnvio?: dayjs.Dayjs | null;
  diasRetraso?: number | null;
  estado?: string | null;
  rastreadors?: IRastreador[] | null;
  idStartup?: IStartups | null;
  idUsuario?: IUsuarios | null;
  idPaquete?: IPaquetes | null;
}

export class DonacionesPaquetes implements IDonacionesPaquetes {
  constructor(
    public id?: number,
    public descripcion?: string | null,
    public montoEnvio?: number | null,
    public montoImpuesto?: number | null,
    public montoTotal?: number | null,
    public fechaDonacion?: dayjs.Dayjs | null,
    public fechaEntrega?: dayjs.Dayjs | null,
    public fechaPosibleEntrega?: dayjs.Dayjs | null,
    public fechaInicialEnvio?: dayjs.Dayjs | null,
    public diasRetraso?: number | null,
    public estado?: string | null,
    public rastreadors?: IRastreador[] | null,
    public idStartup?: IStartups | null,
    public idUsuario?: IUsuarios | null,
    public idPaquete?: IPaquetes | null
  ) {}
}

export function getDonacionesPaquetesIdentifier(donacionesPaquetes: IDonacionesPaquetes): number | undefined {
  return donacionesPaquetes.id;
}
