export interface RetoEstudiante{
  idRetoEstudiante?: number;
  fechaEntrega?: Date;
  puntaje?: number;
  idEstado?: number;
  idReto?: number;
  idEstudiante?: number;
  idRol?: number;
  idGrupo?: number;
  usuarioCreador?: string;
  usuarioModificador?: string;
  fechaCreacion?: Date;
  fechaModificacion?: Date;
  nombreEstado?: string;
  nombreReto?: string;
  intentos?: number;
}
