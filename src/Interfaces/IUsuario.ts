export interface IUsuario{
  codigoUsuario?: number,
  nombreUsuario: string,
  apellidoUsuario: string,
  correo: string,
  direccion: string,
  codigoDepto: number,
  password: string,
  codigoEstado: number,
  fechaCreacion: Date,
  fechaModificacion: Date,
  ultimoLogin: Date
}