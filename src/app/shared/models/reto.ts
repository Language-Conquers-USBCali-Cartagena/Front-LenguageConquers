export interface Reto{
    idReto?:      number;
    nombreReto?:      string;
    descripcion?: string;
    maximoIntentos?:   number;
    fechaInicio?: Date;
    fechaLimite?: Date;
    idMision?:    number;
    idEstado?: number;
    idCurso?: number;
    usuarioCreador?:     string;
    fechaCreacion?: Date;
    usuarioModificador?: string;
    fechaModificacion?: Date;
    esGrupal?: boolean;
    cantidadEstudiantes?: number;
}
