export interface Curso{
    idCurso?:            number;
    nombre?:             string;
    password?:           string;
    cantidadEstudiantes?:number;
    inicioCurso?:        Date;
    finCurso?:           Date;
    progreso?:           number;
    usuarioCreador?:     string;
    usuarioModificador?: string;
    fechaCreacion?:      Date;
    fechaModificacion?:  Date;
    idEstado?:           number;
    idProfesor?:         number;
}
