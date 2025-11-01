 export interface ITicket {
  codigoTicket?: number,
  descripcionTicket: string,
  codigoCliente: number,
  tituloTicket: string,
  codigoCategoria: number,
  codigoPrioridad: number,
  codigoDepto: number,
  codigoUsuario: number,
  codigoEstado: number,
  usuarioCreacion: string,
  fechaCreacion: Date,
  fechaModificacion: Date,
  fechaCierre: Date
}