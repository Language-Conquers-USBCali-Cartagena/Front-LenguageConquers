import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Logros } from 'src/app/shared/models/logros';
import Swal from 'sweetalert2';
import { LogrosService } from '../../../../shared/services/logros/logros.service';
import { getDownloadURL, list, ref, uploadBytesResumable, Storage } from '@angular/fire/storage';
import { MatCheckboxChange } from '@angular/material/checkbox';

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

  isFile: boolean = false;
  isURL: boolean = false;
  porcentajeSubida!:number;

  constructor(private storage: Storage, private fb: FormBuilder,private router:Router, private activatedRoute: ActivatedRoute, private logroService: LogrosService) {
    this,this.crearLogro();
  }

  crearLogro(){
    this.form = this.fb.group({
      idLogro:['', Validators.required],
      nombre:  ['', Validators.required],
      descripcion: ['', Validators.required],
      imagenLogro: ['', Validators.required],
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
    const nombre = this.form.value.nombre;
    const descripcion = this.form.value.descripcion;
    const imagenLogro = this.imagenUrl;
    const usuarioCreador = this.form.value.usuarioCreador;
    let logro: Logros = {nombre: nombre, descripcion: descripcion,  imagen: imagenLogro, usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}
    this.logroService.crearLogro(logro).subscribe(data => {
      if(data){
        Swal.fire({
          icon: 'success',
          title: 'El logro se ha creado exitosamente.',
          showConfirmButton: false,
          timer: 1500
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
        timer: 1500
      });
    });


  }

  setLogros(logro:Logros) {
    this.form.setValue({
      idLogro: logro.idLogro,
      nombre: logro.nombre,
      descripcion: logro.descripcion,
      imagenLogro: logro.imagen,
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
    const nombre = this.form.value.nombre;
    const descripcion = this.form.value.descripcion;
    const imagenLogro = this.form.value.imagenLogro;
    const usuarioModificador = this.form.value.usuarioModificador;
    let logro: Logros = {idLogro:this.form.value.idLogro ,nombre: nombre, descripcion: descripcion, imagen: imagenLogro, usuarioModificador: usuarioModificador,
                                  fechaModificacion: new Date(), fechaCreacion: this.logro.fechaCreacion, usuarioCreador: this.logro.usuarioCreador}
    this.logroService.actualizarLogro(logro).subscribe(()=>{
      Swal.fire({
        icon: 'success',
        title: 'El logro se ha actualizado exitosamente.',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/admin/logros/listar-logros']);
  }, (e) => {
    this.hayErrores = true;
    this.mensajeError = e.error;
    console.log(e['error']);
    Swal.fire({
      icon: 'error',
      title: e['error'],
      showConfirmButton: false,
      timer: 1500
    });
  });
  }

  uploadImage($event: any) {
    const file = $event.target.files[0];
    const imagenReferencia = ref(this.storage, `logros/${file.name}`);
    const uploadTask = uploadBytesResumable(imagenReferencia, file.name);

    uploadTask.on('state_changed',
    (snapshot) => {
     this.porcentajeSubida = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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

        this.imagenUrl = downloadURL;
      });
    }
   );

  }

  getImagenStorage(){
    const imagenReferencia = ref(this.storage, 'logros');
    list(imagenReferencia)
      .then(async response => {
        //console.log(response);
          const urlImagen = await getDownloadURL(response.items[0]);
          console.log(urlImagen);
          //this.imagenUrl = urlImagen;

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
    this.router.navigateByUrl('/admin/logros/listar-logros');
  }
}
