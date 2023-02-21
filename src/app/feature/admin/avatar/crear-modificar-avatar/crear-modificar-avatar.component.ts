
import { Component, OnInit} from '@angular/core';
import { getDownloadURL, list, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder,FormGroup,  Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { uploadBytes } from 'firebase/storage';
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
  imagenUrl: string = "";

  isFile: boolean = false;
  isURL: boolean = false;

  porcentajeSubida!:number;

  constructor(private storage: Storage,private fb: FormBuilder, private router:Router,  private activatedRoute: ActivatedRoute, private avatarService: AvatarService) {
    this.crearAvatar();
  }
  crearAvatar(){
    this.form = this.fb.group({
      idAvatar: ['', Validators.required],
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
    const imagenAvatar = this.imagenUrl;
    const usuarioCreador = this.form.value.usuarioCreador;
    let avatar: Avatar = {nombreAvatar: nombre, imgAvatar: imagenAvatar,  usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}
    this.avatarService.crearAvatar(avatar).subscribe(data => {
      if(data){
        Swal.fire({
          icon: 'success',
          title: 'El avatar se ha creado exitosamente.',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/admin/avatar/listar-avatar']);
      }
    }, (e) => {
      this.hayErrores = true;
      this.mensajeError = e['error'];
      console.log(e['error']);
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
      idAvatar: avatar.idAvatar,
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
    const imagenAvatar = this.imagenUrl;
    const usuarioModificador = this.form.value.usuarioModificador;
    let avatar: Avatar = {idAvatar: this.form.value.idAvatar,nombreAvatar: nombre, imgAvatar: imagenAvatar, usuarioModificador: usuarioModificador,
                                 fechaModificacion: new Date()}
    this.avatarService.actualizarAvatar(avatar).subscribe(()=>{
      Swal.fire({
        icon: 'success',
        title: 'El avatar se ha actualizado exitosamente.',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/admin/avatar/listar-avatar']);
  }, (e) => {
    this.hayErrores = true;
    this.mensajeError = e['error'];
    console.log(e['error']);
    Swal.fire({
      icon: 'error',
      title: e['error'],
      showConfirmButton: false,
      timer: 1500
    });
  }
  );
  }

  uploadImage($event: any) {
    const file = $event.target.files[0];
    console.log(file);
    const imagenReferencia = ref(this.storage, `avatares/${file.name}`);
    console.log(imagenReferencia)
    const uploadTask = uploadBytesResumable(imagenReferencia, file.name);
    uploadTask.on('state_changed',
    (snapshot) => {
      const progress =
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       // console.log('El porcentaje de subida es de ' + progress + '%');
       switch (snapshot.state) {
        case 'paused':
          // console.log('La carga se ha pausado');
          break;
        case 'running':
          // console.log('La carga esta activa');
          break;
      }
    },
    (error) => {
      Swal.fire('Error', 'No se pudo cargar la foto', 'error');
    },() => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // console.log('File available at', downloadURL);
        this.imagenUrl = downloadURL;
      });
    }
   );



  }

  getImagenStorage(){
    const imagenReferencia = ref(this.storage, 'avatares');
    list(imagenReferencia)
      .then(async response => {
        //console.log(response);
          const urlImagen = await getDownloadURL(response.items[0]);
          console.log(urlImagen);
          this.imagenUrl = urlImagen;

      })
      .catch(error => console.log(error));

  }

  archivo(event: MatCheckboxChange){
    if(!event.checked){
      this.isFile = false;
      this.isURL = false;
    }else if(event.checked){
      this.isFile = true;
    }
    else{
      this.isFile = false;
    }

  }
  url(event: MatCheckboxChange){
    if(!event.checked){
      this.isFile = false;
      this.isURL = false;
    }else if(event.checked){
      this.isURL = true;
    }else{
      this.isURL = false;
    }
  }

   atras(){
    this.router.navigateByUrl('/admin/avatar/listar-avatar');
  }

}


