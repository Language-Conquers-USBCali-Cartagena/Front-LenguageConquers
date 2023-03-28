import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/shared/models/curso';
import { Estado } from 'src/app/shared/models/estado';
import { Mision } from 'src/app/shared/models/mision';
import { Monedas } from 'src/app/shared/models/monedas';
import { Reto } from 'src/app/shared/models/reto';
import { CursoService } from 'src/app/shared/services/curso/curso.service';
import { EstadoService } from 'src/app/shared/services/estado/estado.service';
import { MisionService } from 'src/app/shared/services/mision/mision.service';
import { MonedasService } from 'src/app/shared/services/monedas/monedas.service';
import Swal from 'sweetalert2';
import { RetoService } from '../../../../shared/services/reto/reto.service';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';


@Component({
  selector: 'app-crear-registrar',
  templateUrl: './crear-registrar.component.html',
  styleUrls: ['./crear-registrar.component.css']
})
export class CrearRegistrarComponent implements OnInit {

  form!: FormGroup;
  reto!: Reto;
  misiones: Mision[] = [];
  cursos: Curso[] = [];
  estados:Estado[] = [];
  hayErrores = false;
  mensajeError: string="";
  imagenUrl1: string = "";
  imagenUrl2: string = "";
  subirImagen1: string = 'no';
  subirImagen2: string = 'no';
  nombreMision: string | undefined;
  nombreEstado: string | undefined;
  nombreCurso: string | undefined;

  constructor(private fb: FormBuilder, private misionService: MisionService , private cursoService: CursoService,private estadoService: EstadoService,private router:Router, private activatedRoute: ActivatedRoute, private retoService: RetoService, private storage: Storage) {
    this.crearReto();
   }

   crearReto(){
    this.form = this.fb.group({
      idReto: ['', Validators.required],
      nombreReto:  ['', Validators.required],
      descripcion: ['', Validators.required],
      maximoIntentos: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaLimite: ['', Validators.required],
      idMision: ['', Validators.required],
      idCurso: ['', Validators.required],
      idEstado: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required],
      fechaModificacion: ['', Validators.required],
      moneda:['', Validators.required],
      solucion:[],
      descripcionTeoria: ['', Validators.required],
      imagen1:[],
      imagen2:[],
      urlVideo1:[],
      urlVideo2:[]
    });
   }

  ngOnInit(): void {
    this.getEstado();
    this.getMision();
    this.getCurso();
    this.crearReto();
    this.cargarReto();
  }
  getMision(){
    this.misionService.getMision().subscribe(resp => this.misiones = resp);
  }

  setMision(idMision: number){
    this.misionService.consultarPorId(idMision).subscribe(data => {
      this.nombreMision = data.nombre;
    })
  }

  getCurso(){
    this.cursoService.getCurso().subscribe(resp => this.cursos = resp);
  }

  setCurso(idCursor: number){
    this.cursoService.consultarPorId(idCursor).subscribe(data =>{
      this.nombreCurso = data.nombre;
    })
  }


  getEstado(){
    this.estadoService.getEstados().subscribe(resp => this.estados = resp);
  }

  setEstado(idEstado: number){
    this.estadoService.consultarPorId(idEstado).subscribe(data =>{
      this.nombreEstado = data.estado;
    })
  }

  uploadImage($event: any) {
    const file = $event.target.files[0];
    const imagenReferencia = ref(this.storage, `retoArchivos${file.name}`);
    uploadBytes(imagenReferencia, file, { contentType: 'image/png' }).then(
      response => {
        getDownloadURL(imagenReferencia).then(downloadURL => {
          this.imagenUrl1 = downloadURL;
        });
      }).catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error
        });
      });
  }
 /* uploadImage2($event: any) {
    const file = $event.target.files[0];
    const imagenReferencia = ref(this.storage, `retoArchivos${file.name}`);
    uploadBytes(imagenReferencia, file, { contentType: 'image/png' }).then(
      response => {
        getDownloadURL(imagenReferencia).then(downloadURL => {
          this.imagenUrl2 = downloadURL;
        });
      }).catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error
        });
      });
  } */


  guardarReto(){
    this.hayErrores = false;
    const mision = this.form.value.idMision;
    const misionSeleccionado = this.misiones.find(e => e.idMision === mision);
    const idMision = Number(misionSeleccionado?.idMision ??"");
    const estado= this.form.value.idEstado;
    const estadoSeleccionado = this.estados.find(e => e.idEstado === estado);
    const idEstado = Number(estadoSeleccionado?.idEstado ??"");
    const curso = this.form.value.idCurso;
    const cursoSeleccionado = this.cursos.find(e => e.idCurso === curso);
    const idCurso = Number(cursoSeleccionado?.idCurso ??"");
    let reto: Reto = {
      nombreReto: this.form.value.nombreReto,
      descripcion: this.form.value.descripcion,
      maximoIntentos: this.form.value.maximoIntentos,
      fechaInicio: this.form.value.fechaInicio,
      fechaLimite: this.form.value.fechaLimite,
      idMision: idMision,
      idEstado: idEstado,
      idCurso: idCurso,
      moneda: this.form.value.moneda,
      descripcionTeoria:this.form.value.descripcionTeoria,
      solucion: this.form.value.solucion,
      imagen1: this.imagenUrl1 ? this.imagenUrl1: null!,
      imagen2: this.imagenUrl2 ? this.imagenUrl2: null!,
      urlVideo1: this.form.value.urlVideo1,
      urlVideo2: this.form.value.urlVideo2,
      usuarioCreador: this.form.value.usuarioCreador,
      fechaCreacion: new Date(),
      esGrupal: false,
      cantidadEstudiantes: 0}
      console.log(reto)
    this.retoService.crearReto(reto).subscribe(data => {
      console.log(data)
      if(data){
        Swal.fire({
          icon: 'success',
          title: data,
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['/admin/reto/listar-retos']);
      }}, (e) => {
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

  setReto(reto: Reto) {
    this.form.patchValue({
      idReto: reto.idReto,
      nombreReto: reto.nombreReto,
      descripcion: reto.descripcion,
      maximoIntentos: reto.maximoIntentos,
      fechaInicio: reto.fechaInicio,
      fechaLimite: reto.fechaLimite,
      moneda: reto.moneda,
      descripcionTeoria: reto.descripcionTeoria,
      solucion:reto.solucion,
      imagen1: reto.imagen1,
      imagen2: reto.imagen2,
      urlVideo1: reto.urlVideo1,
      urlVideo2: reto.urlVideo2,
      idMision: reto.idMision,
      idEstado: reto.idEstado,
      idCurso: reto.idCurso,
      usuarioCreador: reto.usuarioCreador,
      fechaCreacion: reto.fechaCreacion,
      usuarioModificador: reto.usuarioModificador,
      fechaModificacion: reto.fechaModificacion
    });
  }

  cargarReto(){
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if ( id ) {
          this.retoService.consultarPorId(id).subscribe((data) => {
            this.reto = data;
            this.setReto(this.reto);
          });
        }
      }
    );
  }


  actualizar():void{
    const img1Nueva = this.imagenUrl1;
    const img2Nueva = this.imagenUrl2;
    const img1Vieja = this.reto.imagen1;
    const img2Vieja = this.reto.imagen2;
    const mision = this.form.value.idMision;
    const misionSeleccionado = this.misiones.find(e => e.idMision === mision);
    const idMision = Number(misionSeleccionado?.idMision ??"");
    const estado= this.form.value.idEstado;
    const estadoSeleccionado = this.estados.find(e => e.idEstado === estado);
    const idEstado = Number(estadoSeleccionado?.idEstado ??"");
    const curso = this.form.value.idCurso;
    const cursoSeleccionado = this.cursos.find(e => e.idCurso === curso);
    const idCurso = Number(cursoSeleccionado?.idCurso ??"");
    let reto: Reto = {
      idReto: this.form.value.idReto,
      nombreReto: this.form.value.nombreReto,
      descripcion: this.form.value.descripcion,
      maximoIntentos: this.form.value.maximoIntentos,
      fechaInicio: this.form.value.fechaInicio,
      fechaLimite: this.form.value.fechaLimite,
      idMision: idMision,
      idEstado: idEstado,
      idCurso: idCurso,
      moneda: this.form.value.moneda,
      descripcionTeoria:this.form.value.descripcionTeoria,
      solucion: this.form.value.solucion,
      imagen1: img1Nueva? img1Nueva: img1Vieja,
      imagen2: img2Nueva?img2Nueva: img2Vieja,
      urlVideo1: this.form.value.urlVideo1,
      urlVideo2: this.form.value.urlVideo2,
      usuarioModificador: this.form.value.usuarioModificador,
      fechaModificacion: new Date(),
      esGrupal: false,
      cantidadEstudiantes: 0,
      fechaCreacion: this.reto.fechaCreacion,
      usuarioCreador: this.reto.usuarioCreador}
    this.retoService.actualizarReto(reto).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigate(['/admin/reto/listar-retos']);
    }, (e) => {
      this.hayErrores = true;
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        showCloseButton: true,
      });
    });
  }


  atras(){
    this.router.navigateByUrl('/admin/reto/listar-retos');
  }

}
