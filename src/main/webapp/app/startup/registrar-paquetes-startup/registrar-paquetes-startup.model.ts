export class Paquetes {
  constructor(
    public id?: number,
    public nombre?: string | null,
    public monto?: number | null,
    public descripcion?: string | null,
    public dimensiones?: string | null,
    public estado?: string | null,
    public idStartup?: any | null
  ) {}
}
