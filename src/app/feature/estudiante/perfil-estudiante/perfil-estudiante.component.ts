import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Estudiante } from 'src/app/shared/models/estudiante';
import { EstudianteService } from 'src/app/shared/services/estudiante/estudiante.service';
import { Storage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneroService } from 'src/app/shared/services/genero/genero.service';
import { EstadoService } from 'src/app/shared/services/estado/estado.service';
import { ProgramaService } from 'src/app/shared/services/programa/programa.service';
import { SemestreService } from 'src/app/shared/services/semestre/semestre.service';
import { AvatarService } from 'src/app/shared/services/avatar/avatar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Genero } from 'src/app/shared/models/genero';
import { Avatar } from 'src/app/shared/models/avatar';
import { Semestre } from 'src/app/shared/models/semestre';
import { Programa } from 'src/app/shared/models/programa';
import { Estado } from 'src/app/shared/models/estado';
import Swal from 'sweetalert2';
import { error, log } from 'console';
import { style } from '@angular/animations';
import { EstudianteServiceService } from '../services/estudiante-service.service';
import { RetoService } from 'src/app/shared/services/reto/reto.service';
import { LogrosService } from 'src/app/shared/services/logros/logros.service';
import { CursoService } from 'src/app/shared/services/curso/curso.service';
export var single = [
  {
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  },
  {
    "name": "France",
    "value": 7200000
  },
  {
    "name": "UK",
    "value": 6200000
  },
  {
    "name": "Italy",
    "value": 4200000
  },
  {
    "name": "Spain",
    "value": 8200000
  }
];
@Component({
  selector: 'app-perfil-estudiante',
  templateUrl: './perfil-estudiante.component.html',
  styleUrls: ['./perfil-estudiante.component.css']
})
export class PerfilEstudianteComponent implements OnInit {

  estudiante: Estudiante = {};
  generos: Genero[] = [];
  avatares: Avatar[] = [];
  semestres: Semestre[] = [];
  programas: Programa[] = [];
  estados: Estado[] = [];
  form!: FormGroup;
  pagina: number = 0;
  idAvatar: number = 0;
  hayErrores = false;
  mensajeError: string="";
  correo: string = '';
  idSemestre: number | undefined = 0;
  idGenero: number | undefined = 0;
  idProgramas: number | undefined = 0;
  idEstado: number | undefined = 0;
  nombreSemestre!: string | undefined;
  nombreProgramas!: string| undefined;
  estado!: string;
  semestre!: string;
  genero!: string;
  programa!: string;
  nombreGenero!: string | undefined;
  usuario!: Estudiante;
  nombreEstado!: string | undefined;
  idEstudiante!: number | undefined;
  idAvatarSeleccionado!: number | undefined;
  idAvatarPorDefecto: number | undefined;

  single=[] ;
  view: [number, number] = [200, 300];
  showLegend: boolean = true;
  showLabels: boolean = true;
  progresoCurso: any;
  progresoLogro: any;

constructor(
  private estudianteService: EstudianteServiceService,
  private  estudianteServiceNormal: EstudianteService,
  private fb: FormBuilder, private generoService: GeneroService,
  private semestreService: SemestreService,
  private avatarService: AvatarService,
  private activatedRoute: ActivatedRoute,
  private router:Router,
  private programaService: ProgramaService,
  private estadoService: EstadoService,
  private cursoService: CursoService,
  private logroService: LogrosService
  ) {
    this.crearEstudiante();
    this.single=[];
  }

  ngOnInit() {
    this.estudiante = JSON.parse(String(localStorage.getItem("usuario")));
    this.crearEstudiante();
    this.obtenerEstudiante();
    this.getAvatar(this.pagina);
    this.actualizarGrafica1();
    this.actualizarGrafica2();
    this.cargarAvatarSeleccionado(this.idAvatarPorDefecto!);
    this.getEstado();
    this.getPrograma();
    this.getGenero();
    this.getSemestre();
    this.setEstado();
    this.setSemestre();
    this.setGenero();
    this.setPrograma();
  }


  obtenerEstudiante() {
    let usuarioResp = this.estudiante ;
    this.setEstudiante(usuarioResp);
    this.idAvatarPorDefecto = usuarioResp.idAvatar;
    this.idEstado = usuarioResp.idEstado;
    this.idGenero = usuarioResp.idGenero;
    this.idProgramas = usuarioResp.idPrograma;
    this.idSemestre = usuarioResp.idSemestre;
    this.idEstudiante = usuarioResp.idEstudiante;
  }

  crearEstudiante(){
    this.form = this.fb.group({
      idEstudiante: ['', Validators.required],
      nombre:  ['', Validators.required],
      apellido: ['', Validators.required],
      nickName: ['', Validators.required],
      puntaje: ['', Validators.required],
      idSemestre: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      correo: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required],
      fechaModificacion: ['', Validators.required],
      avatar: ['', Validators.required],
      idGenero: ['', Validators.required],
      idPrograma: ['', Validators.required],
      idEstado: ['', Validators.required],
    });
  }

  actualizarGrafica1() {
    this.cursoService.progresoCurso(1, this.estudiante.idEstudiante!).subscribe((resp) =>{
      this.progresoCurso = Number(resp);
      const gradient = `conic-gradient(#30B4C6 ${Number(resp) * 3.6}deg, #ededed 0deg)`;
      document.getElementById("progreso")!.style.background = gradient;
    }, error => {
      console.log(error.error);
    });
  }

  actualizarGrafica2() {
    this.logroService.progresoLogros(this.estudiante.idEstudiante!).subscribe((resp) =>{
      this.progresoLogro = Number(resp);
      const gradient = `conic-gradient(#ff9a5a ${Number(resp) * 3.6}deg, #ededed 0deg)`;
      document.getElementById("progreso2")!.style.background = gradient;
    }, error => {
      console.log(error.error);

    });
  }
  setEstado(){
    this.estadoService.consultarPorId(this.idEstado!).subscribe(data => {
      this.nombreEstado = data.estado;
      this.estado = this.nombreEstado ?? "";
    });
  }

  setSemestre(){
    this.semestreService.consultarPorId(this.idSemestre!).subscribe(data => {
      this.nombreSemestre = data.nombre;
      this.semestre = this.nombreSemestre ?? "";
    });
  }

  setGenero(){
    this.generoService.consultarPorId(this.idGenero!).subscribe(data => {
      this.nombreGenero = data.genero;
      this.genero = this.nombreGenero ?? "";
    });
  }

  setPrograma(){
    this.programaService.consultarPorId(this.idProgramas!).subscribe(data =>{
      this.nombreProgramas = data.nombre;
      this.programa = this.nombreProgramas ?? "";
    })
  }


  setEstudiante(estudiante: Estudiante){
    this.form = this.fb.group({
      idEstudiante: estudiante.idEstudiante,
      nombre: estudiante.nombre,
      apellido: estudiante.apellido,
      nickName: estudiante.nickName,
      puntaje: estudiante.puntaje,
      idSemestre: estudiante.idSemestre,
      idAvatar: estudiante.idAvatar,
      idGenero: this.nombreGenero,
      usuarioCreador: estudiante.usuarioModificador,
      fechaCreacion: estudiante.fechaCreacion,
      fechaNacimiento: estudiante.fechaNacimiento,
      idPrograma: estudiante.idPrograma,
      correo: estudiante.correo,
      idEstado: estudiante.idEstado,
      usuarioModificador: estudiante.usuarioModificador,
      fechaModificacion: estudiante.fechaModificacion
    });
    this.cargarAvatarSeleccionado(estudiante.idAvatar!);
  }


  async getAvatar(page: number){
    await this.avatarService.getAvataresPage(page).toPromise().then((response) => {
      if(response.length <= 0){
        this.pagina = this.pagina-1;
      }else{
        this.avatares = response;
      }
    })
  }

  pasarIzq(){
    if(this.pagina <=0){
      this.pagina = 0;

    }else{
      this.pagina = this.pagina-1;
      this.getAvatar(this.pagina);
    }
  }
  pasarDer(){
    this.pagina = this.pagina +1;
    this.getAvatar(this.pagina);

  }

  seleccionarAvatar(id:any){
    this.idAvatar = id.idAvatar;
    const images = document.querySelectorAll('img');
    const seleccionado = document.getElementById(String(id));
    images.forEach(imagen => {
      imagen.addEventListener('click', function () {
        const active = <HTMLImageElement>document.querySelector('img');
        seleccionado?.classList.remove('active');
        this.classList.add('active');
      });
    });
  }

  cargarAvatarSeleccionado(idAvatar: number){
    const avatarSeleccionado = this.avatares.find(avatar =>avatar.idAvatar === idAvatar);
    if(avatarSeleccionado){
      const imgElement = document.getElementById(String(this.idAvatarPorDefecto)) as HTMLImageElement;
      imgElement?.classList.add('active');
    }
  }



  getGenero(){
    this.generoService.getGenero().subscribe(resp => this.generos = resp);
  }
  getSemestre(){
    this.semestreService.getSemestre().subscribe(resp => this.semestres = resp);
  }
  getPrograma(){
    this.programaService.getProgramas().subscribe(resp => this.programas = resp)
  }

  getEstado(){
    this.estadoService.getEstados().subscribe(resp => this.estados = resp)
  }


  actualizar():void{
    const idEstudiante = this.form.value.idEstudiante;
    const nombre = this.form.value.nombre;
    const apellido = this.form.value.apellido;
    const nickName = this.form.value.nickName;
    const nacimiento: Date = this.form.value.fechaNacimiento;
    const correo = this.form.value.correo;
    const programa = this.idProgramas;
    const semestre = this.idSemestre;
    const avatar = this.form.value.idAvatar;
    const puntaje = this.form.value.puntaje;
    const genero = this.idGenero;
    const estado = this.idEstado;
    const usuarioModificador = this.form.value.nombre + this.form.value.apellido;
    let estudiante: Estudiante = {
      idEstudiante: idEstudiante,
      nombre: nombre,
      apellido: apellido,
      nickName: nickName,
      puntaje: puntaje,
      idSemestre: semestre,
      idAvatar: avatar,
      idGenero: genero,
      usuarioModificador: usuarioModificador,
      fechaModificacion: new Date(),
      fechaNacimiento: nacimiento,
      idPrograma: programa,
      correo: correo,
      idEstado: estado,
      fechaCreacion: this.estudiante.fechaCreacion,
      usuarioCreador: this.estudiante.usuarioCreador}
    this.estudianteServiceNormal.actualizarEstudiante(estudiante).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigate(['/estudiante/menu']);
    }, (e) => {
      this.hayErrores = true;
      this.mensajeError = e['error'];
      console.log(e['error']);
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        showCloseButton: true,
      });
    });
  }

  onSelect(event: Event) {
    console.log(event);
  }
}
