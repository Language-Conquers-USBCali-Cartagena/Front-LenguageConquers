export interface Estudiante {
    idEstudiante?:       number;
    nombre?:             string;
    apellido?:           string;
    nickName?:           string;
    puntaje?:            number;
    fechaNacimiento?:    Date;
    correo?:             string;
    usuarioCreador?:     string;
    usuarioModificador?: string;
    fechaCreacion?:      Date;
    fechaModificacion?:  Date;
    idPrograma?:         number;
    idEstado?:           number;
    idSemestre?:         number;
    idAvatar?:           number;
    idGenero?:           number;
}