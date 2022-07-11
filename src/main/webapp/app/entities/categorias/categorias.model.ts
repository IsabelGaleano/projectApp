import { IStartups } from 'app/entities/startups/startups.model';

export interface ICategorias {
  id?: number;
  categoria?: string;
  estado?: string | null;
  startups?: IStartups[] | null;
}

export class Categorias implements ICategorias {
  constructor(public id?: number, public categoria?: string, public estado?: string | null, public startups?: IStartups[] | null) {}
}

export function getCategoriasIdentifier(categorias: ICategorias): number | undefined {
  return categorias.id;
}
