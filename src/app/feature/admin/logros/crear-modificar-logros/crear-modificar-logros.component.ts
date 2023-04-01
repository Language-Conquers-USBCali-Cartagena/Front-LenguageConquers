import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Logros } from 'src/app/shared/models/logros';
import Swal from 'sweetalert2';
import { LogrosService } from '../../../../shared/services/logros/logros.service';
import { getDownloadURL, list, ref, uploadBytesResumable, Storage, uploadBytes } from '@angular/fire/storage';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-crear-modificar-logros',
  templateUrl: './crear-modificar-logros.component.html',
  styleUrls: ['./crear-modificar-logros.component.css']
})
export class CrearModificarLogrosComponent implements OnInit {

  form!: FormGroup;
  logro!: Logros;
  hayErrores= false;
  mensajeError: string="";
  imagenUrl: string = "";
  actualizarFoto: string = 'no';
  isFile: boolean = false;
  isURL: boolean = false;
  porcentajeSubida!:number;

  constructor(private storage: Storage, private fb: FormBuilder,private router:Router, private activatedRoute: ActivatedRoute, private logroService: LogrosService) {
    this.crearLogro();
  }

  crearLogro(){
    this.form = this.fb.group({
      idLogro:['', Validators.required],
      nombre:  ['', Validators.required],
      descripcion: ['', Validators.required],
      imagenL: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required],
      fechaModificacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.crearLogro();
    this.cargarLogro();
  }
  guardarLogro(){
    this.hayErrores = false;
    let logro: Logros = {
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      imagen: this.imagenUrl,
      usuarioCreador: this.form.value.usuarioCreador,
      fechaCreacion: new Date()}
    this.logroService.crearLogro(logro).subscribe(data => {
      if(data){
        Swal.fire({
          icon: 'success',
          title: 'El logro se ha creado exitosamente.',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['/admin/logros/listar-logros']);
      }
    }, (e) => {
      this.hayErrores = true;
      this.mensajeError = e.error;
      console.log(e['error']);
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        showCloseButton: true,
      });
    });


  }

  setLogros(logro:Logros) {
    this.form.setValue({
      idLogro: logro.idLogro,
      nombre: logro.nombre,
      descripcion: logro.descripcion,
      imagenL: logro.imagen,
      usuarioCreador: logro.usuarioCreador,
      fechaCreacion: logro.fechaCreacion,
      usuarioModificador: logro.usuarioModificador,
      fechaModificacion: logro.fechaModificacion
    });
  }

  cargarLogro(){
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if ( id ) {
          this.logroService.consultarPorId(id).subscribe((data) => {
            this.logro = data;
            this.setLogros(this.logro);
          });
        }
      }
    );
  }

  actualizar():void{
    const imagenLogroNueva = this.imagenUrl;
    const imagenVieja = this.logro.imagen;
    let logro: Logros = {
      idLogro:this.form.value.idLogro,
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      imagen: imagenLogroNueva ? imagenLogroNueva: imagenVieja,
      usuarioModificador: this.form.value.usuarioModificador,
      fechaModificacion: new Date(),
      fechaCreacion: this.logro.fechaCreacion,
      usuarioCreador: this.logro.usuarioCreador}
    this.logroService.actualizarLogro(logro).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigate(['/admin/logros/listar-logros']);
  }, (e) => {
    this.hayErrores = true;
    this.mensajeError = e.error;
    Swal.fire({
      icon: 'error',
      title: e['error'],
      showConfirmButton: false,
      showCloseButton: true,
    });
  });
  }

  cargandoImagen(){
    setTimeout(()=>{
    Swal.fire({
      icon: 'warning',
      title: 'Se esta cargando la imagen.',
      showCloseButton: false,
      showConfirmButton: false,
      timer: 10000,
      timerProgressBar: true,
    })}, 2000);
  }
  uploadImage($event: any) {
    const file = $event.target.files[0];
    console.log(file);
    const imagenReferencia = ref(this.storage, `logros/${file.name}`);
    uploadBytes(imagenReferencia,file,{contentType:'image/png'}).then(
      response =>{
        getDownloadURL(imagenReferencia).then(downloadURL =>{
          this.imagenUrl = downloadURL;
        });
      }).catch(error =>{
        Swal.fire({
          icon:'error',
          title: 'Oops...',
          text: error
        });
      });
  }

  archivoOrURL(event: MatRadioChange){
    if(event.value ==1){
      this.isFile = true;
      this.isURL = false;
    }else if(event.value ==2){
      this.isURL =true;
      this.isFile = false;
    }
  }

  atras(){
    this.router.navigateByUrl('/admin/logros/listar-logros');
  }
}
