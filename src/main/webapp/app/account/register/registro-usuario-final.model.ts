export class Registro {
  constructor(
    public nombre: string,
    public cedula: string,
    public primer_apellido: string,
    public segundo_apellido: string,
    public correo_electronico: string,
    public genero: string,
    public telefono: string,
    public fecha_nacimiento: Date,
    public latitud_direccion: string,
    public longitud_direccion: string,
    public imagen_url: string,
    public tipo_usuario_final: string,
    public contrasennia: string,
    public estado: string,
    public id_monedero: number,
    public id_rol: number
  ) {}
}
