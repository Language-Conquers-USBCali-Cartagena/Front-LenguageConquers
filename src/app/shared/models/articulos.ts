export interface Articulo{
  nombre?:             string;
  precio?:             number;
  nivelValido?:        number;
  descripcion?:        string;
  imagen?:             string;
  usuarioCreador?:     string;
  usuarioModificador?: string;
  fechaCreacion?:      Date;
  fechaModificacion?:  Date;
  idEstado?:           number;
  idCategoria?:        number;
}
