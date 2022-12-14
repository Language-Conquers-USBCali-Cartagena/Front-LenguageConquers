import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Genero } from 'src/app/shared/models/genero';
import { Profesor } from 'src/app/shared/models/profesor';
import { GeneroService } from 'src/app/shared/services/genero/genero.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {

  form!: UntypedFormGroup;
  generos: Genero[] = [];
  correo: string = '';

  constructor(private fb: UntypedFormBuilder, private generoService: GeneroService, private router: Router) {
    this.form = this.fb.group({
      nombre:  ['', Validators.required],
      apellido: ['', Validators.required],
      genero: ['', Validators.required],
    })
   }

  ngOnInit(): void {
    this.getGenero();
  }
  getGenero(){
    this.generoService.getGenero().subscribe(resp => this.generos = resp);
}

crearProfesor(){

  const correo = this.correo;
  const nombre = this.form.value.nombre;
  const apellido = this.form.value.apellido;
  const foto = 'https://cdn-icons-png.flaticon.com/512/257/257667.png';
  const usuarioCreador = 'admin';
  const fechaCreacion = new Date();
  const genero = this.form.value.genero.idGenero;
  let profesor: Profesor = {nombre: nombre, apellido: apellido, correo:correo, foto:foto, usuarioCreador: usuarioCreador, fechaCreacion: fechaCreacion, idGenero: genero}

  Swal.fire({
    icon: 'success',
    title: 'El Docente se ha creado Exitosamente',
    showConfirmButton: false,
    timer: 1500
  })


}

}
