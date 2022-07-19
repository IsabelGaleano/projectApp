export class RegistroAdmin {
  constructor(
    public nombre: string,
    public cedula: string,
    public primerApellido: string,
    public segundoApellido: string,
    public correoElectronico: string,
    public genero: string,
    public telefono: string,
    public fechaNacimiento: Date,
    public latitudDireccion: string,
    public longitudDireccion: string,
    public imagenURL: string,
    public tipoUsuarioFinal: string,
    public contrasennia: string,
    public estado: string,
    public idMonedero: any,
    public idRol: number
  ) {}

  get getNombre(): string {
    return this.nombre;
  }

  set setNombre(value: string) {
    this.nombre = value;
  }

  get getCedula(): string {
    return this.cedula;
  }

  set setCedula(value: string) {
    this.cedula = value;
  }

  get getPrimerApellido(): string {
    return this.primerApellido;
  }

  set setPrimerApellido(value: string) {
    this.primerApellido = value;
  }

  get getSegundoApellido(): string {
    return this.segundoApellido;
  }

  set setSegundoApellido(value: string) {
    this.segundoApellido = value;
  }

  get getCorreoElectronico(): string {
    return this.correoElectronico;
  }

  set setCorreoElectronico(value: string) {
    this.correoElectronico = value;
  }

  get getGenero(): string {
    return this.genero;
  }

  set setGenero(value: string) {
    this.genero = value;
  }

  get getTelefono(): string {
    return this.telefono;
  }

  set setTelefono(value: string) {
    this.telefono = value;
  }

  get getFechaNacimiento(): Date {
    return this.fechaNacimiento;
  }

  set setFechaNacimiento(value: Date) {
    this.fechaNacimiento = value;
  }

  get getLatitudDireccion(): string {
    return this.latitudDireccion;
  }

  set setLatitudDireccion(value: string) {
    this.latitudDireccion = value;
  }

  get getLongitudDireccion(): string {
    return this.longitudDireccion;
  }

  set setLongitudDireccion(value: string) {
    this.longitudDireccion = value;
  }

  get getImagenURL(): string {
    return this.imagenURL;
  }

  set setImagenURL(value: string) {
    this.imagenURL = value;
  }

  get getTipoUsuarioFinal(): string {
    return this.tipoUsuarioFinal;
  }

  set setTipoUsuarioFinal(value: string) {
    this.tipoUsuarioFinal = value;
  }

  get getContrasennia(): string {
    return this.contrasennia;
  }

  set setContrasennia(value: string) {
    this.contrasennia = value;
  }

  get getEstado(): string {
    return this.estado;
  }

  set setEstado(value: string) {
    this.estado = value;
  }

  get getIdMonedero(): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.idMonedero;
  }

  set setIdMonedero(value: string) {
    this.idMonedero = value;
  }

  get getIdRol(): number {
    return this.idRol;
  }

  set setIdRol(value: number) {
    this.idRol = value;
  }
}
