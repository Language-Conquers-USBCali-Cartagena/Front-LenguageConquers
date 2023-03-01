import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/shared/models/curso';
import { Estado } from 'src/app/shared/models/estado';
import { Mision } from 'src/app/shared/models/mision';
import { Monedas } from 'src/app/shared/models/monedas';
import { CursoService } from 'src/app/shared/services/curso/curso.service';
import { MonedasService } from 'src/app/shared/services/monedas/monedas.service';
import Swal from 'sweetalert2';
import { MisionService } from '../../../../shared/services/mision/mision.service';
import { DomSanitizer } from '@angular/platform-browser';
import { getDownloadURL, list, ref,  Storage, uploadBytes } from '@angular/fire/storage';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';



@Component({
  selector: 'app-crear-modificar-mision',
  templateUrl: './crear-modificar-mision.component.html',
  styleUrls: ['./crear-modificar-mision.component.css']
})
export class CrearModificarMisionComponent implements OnInit {

  form!: FormGroup;
  mision!:Mision;
  monedas: Monedas[] = [];
  cursos: Curso[] = [];
  estados:Estado[] = [];
  hayErrores = false;
  mensajeError: string="";
  imagenUrl: string = "";

  isFile: boolean = false;
  isURL: boolean = false;

  porcentajeSubida!:number;


  constructor(private storage: Storage, private fb: FormBuilder, private monedasService: MonedasService,private cursoService: CursoService, private router:Router,  private activatedRoute: ActivatedRoute, private misionService: MisionService) {
    this.crearMision();
   }

   crearMision(){
    this.form = this.fb.group({
      idMision: ['', Validators.required],
      nombre:  ['', Validators.required],
      imagen: ['', Validators.required],
      idCurso: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required],
      fechaModificacion: ['', Validators.required]
    });
   }
  ngOnInit(): void {
    this.crearMision();
    this.cargarMision();
    this.getCurso();

  }

  getCurso(){
    this.cursoService.getCurso().subscribe(resp => this.cursos = resp)
  }
  getMonedas(){
    this.monedasService.getMoneda().subscribe(resp => this.monedas = resp)
  }

  guardarMision(){
    this.hayErrores = false;
   // this.fileInput.nativeElement.dispatchEvent(new Event('change'));

    const nombre = this.form.value.nombre;
    const imagenMision = this.imagenUrl;
    const curso = this.form.value.idCurso;
    const usuarioCreador = this.form.value.usuarioCreador;
    let mision: Mision = {nombre: nombre, imagen: imagenMision, idCurso:curso.idCurso, usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}
    this.misionService.crearMision(mision).subscribe(data =>{
      if(data){
        Swal.fire({
          icon: 'success',
          title: data,
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/admin/misiones/listar-misiones']);
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

  uploadImage($event: any) {
    const file = $event.target.files[0];
    console.log(file);
    const imagenReferencia = ref(this.storage, `misiones/${file.name}`);
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

  setMision(mision: Mision) {
    this.form.setValue({
      idMision: mision.idMision,
      nombre: mision.nombre,
      imagen: mision.imagen,
      idCurso: mision.idCurso,
      usuarioCreador: mision.usuarioCreador,
      fechaCreacion : mision.fechaCreacion,
      usuarioModificador: mision.usuarioModificador,
      fechaModificacion: mision.fechaModificacion
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
  cargarMision(){
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if ( id ) {
          this.misionService.consultarPorId(id).subscribe(data => {
            this.mision = data;
            this.setMision(this.mision);
          });
        }
      }
    );
  }

  actualizar():void{
    const nombre = this.form.value.nombre;
    const imagenMision = this.form.value.imagen;
    const curso = this.form.value.idCurso;
    const usuarioModificador = this.form.value.usuarioModificador;
    let mision: Mision = {idMision: this.form.value.idMision, nombre: nombre, imagen: imagenMision,  idCurso:curso.idCurso, usuarioModificador: usuarioModificador,
                                  fechaModificacion: new Date(), fechaCreacion: this.mision.fechaCreacion, usuarioCreador: this.mision.usuarioCreador}
    this.misionService.actualizarMision(mision).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/admin/misiones/listar-misiones']);
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

  atras(){
    this.router.navigateByUrl('/admin/misiones/listar-misiones');
  }

}
