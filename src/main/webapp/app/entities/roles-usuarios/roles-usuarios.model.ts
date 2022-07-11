import { IUsuarios } from 'app/entities/usuarios/usuarios.model';

export interface IRolesUsuarios {
  id?: number;
  rol?: string;
  usuarios?: IUsuarios[] | null;
}

export class RolesUsuarios implements IRolesUsuarios {
  constructor(public id?: number, public rol?: string, public usuarios?: IUsuarios[] | null) {}
}

export function getRolesUsuariosIdentifier(rolesUsuarios: IRolesUsuarios): number | undefined {
  return rolesUsuarios.id;
}
