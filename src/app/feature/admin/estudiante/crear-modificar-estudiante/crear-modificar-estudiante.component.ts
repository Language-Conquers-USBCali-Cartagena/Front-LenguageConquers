import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-crear-modificar-estudiante',
  templateUrl: './crear-modificar-estudiante.component.html',
  styleUrls: ['./crear-modificar-estudiante.component.css']
})
export class CrearModificarEstudianteComponent implements OnInit {

  estudiante!: Estudiante;
  form!: FormGroup;
  generos: Genero[] = [];
  avatares: Avatar[] = [];
  semestres: Semestre[] = [];
  programas: Programa[] = [];
  estados: Estado[] = [];
  correo: string = '';
  pagina: number = 0;
  idAvatar?: number = 0;
  hayErrores = false;
  mensajeError: string = "";
  avatarSeleccionado = this.avatares[0];
  nombreSemestre!: string | undefined;
  nombreProgramas!: string | undefined;
  estado!: string;
  semestre!: string;
  genero!: string;
  programa!: string;
  nombreGenero!: string | undefined;
  usuario!: Estudiante;
  nombreEstado!: string | undefined;
  nombreAvatar!: string | undefined;
  idAvatarS: string = '';
  idAvatarEstudiante: number |undefined;

  @ViewChild('avatarImg') avatarImg!: ElementRef<HTMLImageElement>;
  idSeleccionado: any;

  avatarPorDefecto: any;
  idAvatarPorDefecto: number | undefined;


  constructor(private fb: FormBuilder, private generoService: GeneroService, private semestreService: SemestreService, private avatarService: AvatarService, private activatedRoute: ActivatedRoute,
    private router: Router, private programaService: ProgramaService, private estadoService: EstadoService, private estudianteService: EstudianteService) {
    this.crearEstudiante();
    //this.idAvatar = this.avatares[0]?.idAvatar ?? 0;
  }


  async ngOnInit(){
      await this.cargarEstudiante();
      this.getGenero();
      this.getAvatar(this.pagina);
      this.getSemestre();
      this.getPrograma();
      this.getEstado();

  }

  crearEstudiante() {
    this.form = this.fb.group({
      idEstudiante: ['', Validators.required],
      nombre: ['', Validators.required],
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
      monedasObtenidas: [''],
    });
  }




  getPrograma() {
    this.programaService.getProgramas().subscribe(resp => this.programas = resp)
  }

  getEstado() {
    this.estadoService.getEstados().subscribe(resp => this.estados = resp)
  }

  getGenero() {
    this.generoService.getGenero().subscribe(resp => this.generos = resp);
  }
  getSemestre() {
    this.semestreService.getSemestre().subscribe(resp => this.semestres = resp);
  }

  setEstado(idEstado: number) {
    this.estadoService.consultarPorId(idEstado).subscribe(data => {
      this.nombreEstado = data.estado;
    });
  }

  setSemestre(idSemestre: number) {
    this.semestreService.consultarPorId(idSemestre).subscribe(data => {
      this.nombreSemestre = data.nombre;
    });
  }

  setGenero(idGenero: number) {
    this.generoService.consultarPorId(idGenero).subscribe(data => {
      this.nombreGenero = data.genero;
    });
  }

  setPrograma(idPrograma: number) {
    this.programaService.consultarPorId(idPrograma).subscribe(data => {
      this.nombreProgramas = data.nombre;
    })
  }




  async getAvatar(page: number) {
    await this.avatarService.getAvataresPage(page).toPromise().then((response) => {
      if (response.length <= 0) {
        this.pagina = this.pagina - 1;
      } else {
        this.avatares = response;
      }
    })
  }

  pasarIzq() {
    if(this.pagina <=0){
      this.pagina = 0;

    }else{
      this.pagina = this.pagina-1;
      this.getAvatar(this.pagina);
    }
  }
  pasarDer() {
    this.pagina = this.pagina +1;
    this.getAvatar(this.pagina);
  }

  seleccionarAvatar(avatar: any) {
    this.idAvatar = avatar.idAvatar;
    console.log('id del avatar: ' + this.idAvatar);
    const images = document.querySelectorAll('img');
    const seleccionado = document.getElementById(String(avatar.idAvatar));
    images.forEach(imagen => {
      imagen.addEventListener('click', function () {
        const active = <HTMLImageElement>document.querySelector('img');
        seleccionado?.classList.remove('active');
        this.classList.add('active');
      });
    });


  }



  guardarEstudiante() {
    this.hayErrores = false;
    const programa = this.form.value.idPrograma;
    const programaSeleccionado = this.programas.find(e =>e.idPrograma == programa);
    const idPrograma = Number(programaSeleccionado?.idPrograma ?? "");
    const semestre = this.form.value.idSemestre;
    const semestreSeleccionado = this.semestres.find(e =>e.idSemestre == semestre);
    const idSemestre = Number(semestreSeleccionado?.idSemestre ?? "");
    const avatar = this.idAvatar;
    const genero = this.form.value.idGenero;
    const generoSeleccionado = this.generos.find(e => e.idGenero == genero);
    const idGenero = Number(generoSeleccionado?.idGenero ?? "");
    const estado = this.form.value.idEstado;
    const estadoSeleccionado = this.estados.find(e => e.idEstado == estado);
    const idEstado = Number(estadoSeleccionado?.idEstado ?? "");
    let estudiante: Estudiante = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      nickName: this.form.value.nickName,
      puntaje: 0,
      monedasObtenidas: 0,
      idSemestre: idSemestre,
      idAvatar: avatar,
      idGenero: idGenero,
      usuarioCreador: this.form.value.usuarioCreador,
      fechaCreacion: new Date(),
      fechaNacimiento: this.form.value.fechaNacimiento,
      idPrograma: idPrograma,
      correo: this.form.value.correo,
      idEstado: idEstado
    }
    this.estudianteService.crearEstudiante(estudiante).subscribe(data => {
      if (data) {
        Swal.fire({
          icon: 'success',
          title: data,
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['/admin/estudiante/listar-estudiantes']);
      }
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

  setEstudiante(estudiante: Estudiante) {
    this.form.setValue({
      idEstudiante: estudiante.idEstudiante,
      nombre: estudiante.nombre,
      apellido: estudiante.apellido,
      nickName: estudiante.nickName,
      puntaje: estudiante.puntaje,
      idSemestre: estudiante.idSemestre,
      avatar: estudiante.idAvatar,
      idGenero: estudiante.idGenero,
      usuarioCreador: estudiante.usuarioModificador,
      fechaCreacion: estudiante.fechaCreacion,
      fechaNacimiento: estudiante.fechaNacimiento,
      idPrograma: estudiante.idPrograma,
      correo: estudiante.correo,
      idEstado: estudiante.idEstado,
      usuarioModificador: estudiante.usuarioModificador,
      fechaModificacion: estudiante.fechaModificacion,
      monedasObtenidas: estudiante.monedasObtenidas,
    });
  }
  async cargarEstudiante() {
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if (id) {
          this.estudianteService.consultarPorId(id).subscribe((data) => {
            this.estudiante = data;
            this.idAvatarEstudiante = data.idAvatar;
            this.setEstudiante(this.estudiante);

            this.avatares.forEach(avatar => {
              if (avatar.idAvatar === this.idAvatarEstudiante) {
              setTimeout(() => {
                const imgElement = document.getElementById(this.idAvatarEstudiante!.toString()) as HTMLImageElement;
                imgElement?.classList.add('active');
              },100);
              }
            });
          });
        }
      }
    );
  }

  actualizar(): void {
    const programa = this.form.value.idPrograma;
    const programaSeleccionado = this.programas.find(e =>e.idPrograma == programa);
    const idPrograma = Number(programaSeleccionado?.idPrograma ?? "");
    const semestre = this.form.value.idSemestre;
    const semestreSeleccionado = this.semestres.find(e =>e.idSemestre == semestre);
    const idSemestre = Number(semestreSeleccionado?.idSemestre ?? "");
    const avatar = this.idAvatar;
    const genero = this.form.value.idGenero;
    const generoSeleccionado = this.generos.find(e => e.idGenero == genero);
    const idGenero = Number(generoSeleccionado?.idGenero ?? "");
    const estado = this.form.value.idEstado;
    const estadoSeleccionado = this.estados.find(e => e.idEstado == estado);
    const idEstado = Number(estadoSeleccionado?.idEstado ?? "");
    let estudiante: Estudiante = {
      idEstudiante: this.form.value.idEstudiante,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      nickName: this.form.value.nickName,
      puntaje: this.form.value.puntaje,
      fechaNacimiento: this.form.value.fechaNacimiento,
      correo: this.form.value.correo,
      usuarioCreador: this.estudiante.usuarioCreador,
      usuarioModificador: this.form.value.usuarioModificador,
      fechaCreacion: this.estudiante.fechaCreacion,
      fechaModificacion:new Date(),
      idPrograma: idPrograma,
      idEstado: idEstado,
      idSemestre: idSemestre,
      idAvatar: avatar,
      idGenero:idGenero,
      monedasObtenidas:this.form.value.monedasObtenidas
    }
    this.estudianteService.actualizarEstudiante(estudiante).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigate(['/admin/estudiante/listar-estudiantes']);
    }, (e) => {
      this.hayErrores = true;
      this.mensajeError = e['error'];
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        showCloseButton: true,
      });
    });
  }

  atras() {
    this.router.navigateByUrl('/admin/estudiante/listar-estudiantes');
  }

}
