export interface Reto{
    idReto?:          string;
    nombre?:      string;
    descripcion?: string;
    intentos?:    number;
    fechaInicio?: Date;
    fechaLimite?: Date;
    idMision?:    number;
    idEstado?: number;
    idCurso?: number;
    usuarioCreador?:     string;
    fechaCreacion?: Date;
    usuarioModificador?: string;
    fechaModificacion?: Date;
}
