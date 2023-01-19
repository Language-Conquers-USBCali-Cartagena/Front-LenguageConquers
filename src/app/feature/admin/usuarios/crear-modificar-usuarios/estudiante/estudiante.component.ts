import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Avatar } from 'src/app/shared/models/avatar';
import { Estado } from 'src/app/shared/models/estado';
import { Estudiante } from 'src/app/shared/models/estudiante';
import { Genero } from 'src/app/shared/models/genero';
import { Programa } from 'src/app/shared/models/programa';
import { Semestre } from 'src/app/shared/models/semestre';
import { AvatarService } from 'src/app/shared/services/avatar/avatar.service';
import { EstadoService } from 'src/app/shared/services/estado/estado.service';
import { EstudianteService } from 'src/app/shared/services/estudiante/estudiante.service';
import { GeneroService } from 'src/app/shared/services/genero/genero.service';
import { ProgramaService } from 'src/app/shared/services/programa/programa.service';
import { SemestreService } from 'src/app/shared/services/semestre/semestre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  estudiante!: Estudiante;
  form!: FormGroup;
  generos: Genero[] = [];
  avatares: Avatar[] = [];
  semestres: Semestre[] = [];
  programas: Programa[] = [];
  estados: Estado[] = [];
  correo: string = '';
  pagina: number = 0;
  idAvatar: number = 0;
  hayErrores = false;
  mensajeError: string="";

  constructor(private fb: FormBuilder, private generoService: GeneroService, private semestreService: SemestreService,private avatarService: AvatarService, private activatedRoute: ActivatedRoute,
              private router:Router, private programaService: ProgramaService, private estadoService: EstadoService, private estudianteService: EstudianteService) {
      this.crearEstudiante();
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
  ngOnInit(): void {
    this.crearEstudiante();
    this.cargarEstudiante();
    this.getGenero();
    this.getAvatar(this.pagina);
    this.getSemestre();
    this.getPrograma();
    this.getEstado();
  }

  getGenero(){
    this.generoService.getGenero().subscribe(resp => this.generos = resp);
  }
  getSemestre(){
    this.semestreService.getSemestre().subscribe(resp => this.semestres = resp);
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
      this.pagina = this.avatares.length -1;
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

  getPrograma(){
    this.programaService.getProgramas().subscribe(resp => this.programas = resp)
  }

  getEstado(){
    this.estadoService.getEstados().subscribe(resp => this.estados = resp)
  }

  guardarEstudiante(){
    this.hayErrores = false;
    const nombre = this.form.value.nombre;
    const apellido = this.form.value.apellido;
    const nickName = this.form.value.nickName;
    const nacimiento: Date  = this.form.value.fechaNacimiento;
    const correo = this.form.value.correo;
    const programa = this.form.value.idPrograma
    const semestre = this.form.value.idSemestre;
    const avatar = this.idAvatar;
    const genero = this.form.value.idGenero;
    const estado = this.form.value.idEstado;
    const usuarioCreador = this.form.value.usuarioCreador;
    let estudiante: Estudiante = {nombre: nombre, apellido: apellido, nickName: nickName, puntaje: 0, idSemestre: semestre, idAvatar: avatar, idGenero: genero, usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date(), fechaNacimiento: nacimiento, idPrograma: programa, correo: correo, idEstado: estado}
      this.estudianteService.crearEstudiante(estudiante).subscribe(data =>{
        if(data){
          Swal.fire({
            icon: 'success',
            title: 'El estudiante se ha creado exitosamente.',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/admin/usuarios/listar-usuarios']);
        }
      }, (e) => {
        this.hayErrores = true;
        this.mensajeError = e.error;
        console.log(e);
        Swal.fire({
          icon: 'error',
          title: e['error'],
          showConfirmButton: false,
          timer: 1500
        });
      });
  }

  setEstudiante(estudiante: Estudiante){
    this.form.setValue({
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
  cargarEstudiante(){
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if ( id ) {
          this.estudianteService.consultarPorId(id).subscribe((data) => {
            this.estudiante= data;
            this.setEstudiante(this.estudiante);
          });
        }
      }
    );
  }

  actualizar():void{
    const nombre = this.form.value.nombre;
    const apellido = this.form.value.apellido;
    const nickName = this.form.value.nickName;
    const nacimiento: Date = this.form.value.fechaNacimiento;
    const correo = this.form.value.correo;
    const programa = this.form.value.idPrograma
    const semestre = this.form.value.idSemestre;
    const avatar = this.form.value.idAvatar;
    const puntaje = this.form.value.puntaje;
    const genero = this.form.value.idGenero;
    const estado = this.form.value.idEstado;
    const usuarioModificador = this.form.value.usuarioModificador;
    let estudiante: Estudiante = {idEstudiante: this.form.value.idEstudiante,nombre: nombre, apellido: apellido, nickName: nickName, idSemestre: semestre, idAvatar: avatar, idGenero: genero, usuarioModificador: usuarioModificador,
                                  fechaModificacion: new Date(), fechaNacimiento: nacimiento, idPrograma: programa, correo: correo, idEstado: estado}
    this.estadoService.actualizarEstado(estudiante).subscribe(()=>{
      Swal.fire({
        icon: 'success',
        title: 'El estudiante se ha actualizado exitosamente.',
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

  atras(){
    this.router.navigateByUrl('/admin/usuarios/listar-usuarios');
  }

}
