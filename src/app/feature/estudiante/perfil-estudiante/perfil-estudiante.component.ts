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
import { log } from 'console';
import { style } from '@angular/animations';

@Component({
  selector: 'app-perfil-estudiante',
  templateUrl: './perfil-estudiante.component.html',
  styleUrls: ['./perfil-estudiante.component.css']
})
export class PerfilEstudianteComponent implements OnInit {

  estudiante!: Estudiante;
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



  //Progreso 1

  circularProgress = document.querySelector("[class='circular-progress']") as HTMLElement;
  progreso2=document.querySelector('#grafica2 #progreso2') as HTMLElement;
  progressValue = document.querySelector('.progress-value');
  progressValue2 = document.getElementById("progressValue2")
  progressStartValue = 0;
  progressStartValue2 = 0;
  //aqui va el valor de la grafica que se debe poner desde el servicio
  progressEndValue = 20;
  progressEndValue2 = 30;
  speed = 100;
  progress = setInterval(() => {
    this.progressStartValue++;
    document.querySelector('.progress-value')!.textContent = `${this.progressStartValue}%`;
   document.getElementById("progreso")!.style.background= `conic-gradient(#cd9e76 ${this.progressStartValue * 3.6}deg, #ededed 0deg)` ;
    if (this.progressStartValue == this.progressEndValue) {
      clearInterval(this.progress);
    }
  }, this.speed);

  //progreso 2

  progresoBarra2 = setInterval(() => {
    this.progressStartValue2++;
    document.querySelector('#grafica2 #progreso2 #progressValue2')!.textContent = `${this.progressStartValue2}%`;
    document.getElementById("progreso2")!.style.background= `conic-gradient(#cd9e76 ${this.progressStartValue2 * 3.6}deg, #ededed 0deg)` ;
    if (this.progressStartValue2 == this.progressEndValue2) {
      clearInterval(this.progresoBarra2);
    }
  }, this.speed);


  constructor(private estudianteService: EstudianteService,private fb: FormBuilder, private generoService: GeneroService, private semestreService: SemestreService,private avatarService: AvatarService, private activatedRoute: ActivatedRoute,
    private router:Router, private programaService: ProgramaService, private estadoService: EstadoService) {
      this.crearEstudiante();
     }

  ngOnInit(): void {
    this.crearEstudiante();
    //this.cargarEstudiante();
    this.getAvatar(this.pagina);
    this.getEstado();
    this.getPrograma();
    this.getGenero();
    this.getSemestre();
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

  cargarEstudiante(email: string){
    this.activatedRoute.params.subscribe(
      async (params) => {
          await this.estudianteService.getEstudiantePorCorreo(email).subscribe((data) => {
            this.estudiante= data;
            this.setEstudiante(this.estudiante);
          });
      }
    );
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
      idGenero: estudiante.idGenero,
      usuarioCreador: estudiante.usuarioModificador,
      fechaCreacion: estudiante.fechaCreacion,
      fechaNacimiento: estudiante.fechaNacimiento,
      idPrograma: estudiante.idPrograma,
      correo: estudiante.correo,
      idEstado: estudiante.idEstado,
      usuarioModificador: estudiante.usuarioModificador,
      fechaModificacion: estudiante.fechaModificacion
    });
  }

  getEstudiantePorCorreo(email:string){
    if(this.estudianteService.existEstudianteByCorreo(email)){
      this.estudianteService.getEstudiantePorCorreo(email)
    }
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
      console.log(this.pagina);
    }
  }
  pasarDer(){

    this.pagina = this.pagina +1;
    
    console.log(this.pagina);
    console.log(this.avatares.length);
    this.getAvatar(this.pagina);

  }

  seleccionarAvatar(id:any){
    this.idAvatar = id.idAvatar;

    const images = document.querySelectorAll('img');
    let seleccionado = document.getElementById(id.idAvatar);
    images.forEach(imagen => {
    imagen.addEventListener('click', function(){
      const active = <HTMLImageElement>document.querySelector('img');
      seleccionado?.classList.remove('active');
      /*console.log(typeof seleccionado?.id);*/
      this.classList.add('active');
    });
   });
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
    const nombre = this.form.value.nombre;
    const apellido = this.form.value.apellido;
    const nickName = this.form.value.nickName;
    const nacimiento: Date = this.form.value.fechaNacimiento;
    const correo = this.form.value.correo;
    const programa = this.form.value.idPrograma
    const semestre = this.form.value.idSemestre;
    const avatar = this.idAvatar;
    const puntaje = this.form.value.puntaje;
    const genero = this.form.value.idGenero;
    const estado = this.form.value.idEstado;
    const usuarioModificador = this.form.value.usuarioModificador;
    let estudiante: Estudiante = {idEstudiante: this.form.value.idEstudiante,nombre: nombre, apellido: apellido, nickName: nickName, idSemestre: semestre.idSemestre, idAvatar: avatar, idGenero: genero.idGenero, usuarioModificador: usuarioModificador,
                                  fechaModificacion: new Date(), fechaNacimiento: nacimiento, idPrograma: programa.idPrograma, correo: correo, idEstado: estado.idEstado, fechaCreacion: this.estudiante.fechaCreacion, usuarioCreador: this.estudiante.usuarioCreador}
    this.estadoService.actualizarEstado(estudiante).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/admin/usuarios/listar-usuarios']);
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



}
