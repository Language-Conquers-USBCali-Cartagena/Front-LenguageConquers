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
    monedas?:number;
    solucion?:string;
    descripcionTeoria?: string;
    imgTema1?: string;
    imgTema2?: string;
    urlVideo1?:string;
    urlVideo2?:string;
}
