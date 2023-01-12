
import { Component, OnInit} from '@angular/core';
import { FormBuilder,FormGroup,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Avatar } from 'src/app/shared/models/avatar';
import { AvatarService } from 'src/app/shared/services/avatar/avatar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-modificar-avatar',
  templateUrl: './crear-modificar-avatar.component.html',
  styleUrls: ['./crear-modificar-avatar.component.css']
})
export class CrearModificarAvatarComponent implements OnInit {

  form!: FormGroup;
  avatar!: Avatar;
  idA!: number;
  hayErrores = false;
  mensajeError: string="";
  crear:boolean = false;


  constructor(private fb: FormBuilder, private router:Router,  private activatedRoute: ActivatedRoute, private avatarService: AvatarService) {
    this.crearAvatar();
  }
  crearAvatar(){
    this.form = this.fb.group({
      nombre:  ['', Validators.required],
      imagenAvatar: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required],
      fechaModificacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.crearAvatar();
    this.cargarAvatar();
  }

  guardarAvatar(){
    this.hayErrores = false;
    this.crear = true;
    const nombre = this.form.value.nombre;
    const imagenAvatar = this.form.value.imagenAvatar;
    const usuarioCreador = this.form.value.usuarioCreador;
    let avatar: Avatar = {nombreAvatar: nombre, imgAvatar: imagenAvatar,  usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}
    this.avatarService.crearAvatar(avatar).subscribe(data => {
      if(data){
        Swal.fire({
          icon: 'success',
          title: 'El Avatar se ha creado Exitosamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/admin/avatar/listar-avatar']);
      }
    }, (e) => {
      this.hayErrores = true;
      this.mensajeError = e.error;
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        timer: 1500
      });
    });
  }


  setAvatar(avatar:Avatar){
    this.form.setValue({
      nombre: avatar.nombreAvatar,
      imagenAvatar: avatar.imgAvatar,
      usuarioCreador: avatar.usuarioCreador,
      fechaCreacion: avatar.fechaCreacion,
      usuarioModificador: avatar.usuarioModificador,
      fechaModificacion: avatar.fechaModificacion
    });
  }

  cargarAvatar(){
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if ( id ) {
          this.avatarService.consultarPorId(id).subscribe((data) => {
            this.avatar= data;
            this.setAvatar(this.avatar);
          });
        }
      }
    );
  }

  actualizar():void{
    const nombre = this.form.value.nombre;
    const imagenAvatar = this.form.value.imagenAvatar;
    const usuarioModificador = this.form.value.usuarioModificador;
    let avatar: Avatar = {nombreAvatar: nombre, imgAvatar: imagenAvatar, usuarioModificador: usuarioModificador,
                                 fechaModificacion: new Date()}
    this.avatar.idAvatar = this.form.value.idAvatar;
    this.avatarService.actualizarAvatar(avatar).subscribe(()=>{
      this.router.navigate(['/admin/avatar/listar-avatar']);
    });
  }

   atras(){
    this.router.navigateByUrl('/admin/avatar/listar-avatar');
  }

}


