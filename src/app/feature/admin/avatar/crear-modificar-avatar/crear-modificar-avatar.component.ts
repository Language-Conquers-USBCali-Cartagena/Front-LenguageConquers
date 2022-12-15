import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Avatar } from 'src/app/shared/models/avatar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-modificar-avatar',
  templateUrl: './crear-modificar-avatar.component.html',
  styleUrls: ['./crear-modificar-avatar.component.css']
})
export class CrearModificarAvatarComponent implements OnInit {

  form!: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder, private router:Router) {
    this.form = this.fb.group({
      nombre:  ['', Validators.required],
      imagenAvatar: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }
  crearAvatar(){
    const nombre = this.form.value.nombre;
    const imagenAvatar = this.form.value.imagenAvatar;
    const usuarioCreador = this.form.value.usuarioCreador;
    let avatar: Avatar = {nombreAvatar: nombre, imgAvatar: imagenAvatar,  usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}

    Swal.fire({
      icon: 'success',
      title: 'El Avatar se ha creado Exitosamente',
      showConfirmButton: false,
      timer: 1500
    })

  }


  atras(){
    this.router.navigateByUrl('/admin/avatar/listar-avatar');
  }

}
