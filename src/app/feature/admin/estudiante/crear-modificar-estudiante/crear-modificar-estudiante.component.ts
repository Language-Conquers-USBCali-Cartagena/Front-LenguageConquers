import { Component, OnInit } from '@angular/core';
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
  idAvatar: number = 0;
  hayErrores = false;
  mensajeError: string = "";
  idSemestre: number | undefined = 0;
  idGenero: number | undefined = 0;
  idProgramas: number | undefined = 0;
  idEstado: number | undefined = 0;
  nombreSemestre!: string | undefined;
  nombreProgramas!: string | undefined;
  estado!: string;
  semestre!: string;
  genero!: string;
  programa!: string;
  nombreGenero!: string | undefined;
  usuario!: Estudiante;
  nombreEstado!: string | undefined;

  constructor(private fb: FormBuilder, private generoService: GeneroService, private semestreService: SemestreService, private avatarService: AvatarService, private activatedRoute: ActivatedRoute,
    private router: Router, private programaService: ProgramaService, private estadoService: EstadoService, private estudianteService: EstudianteService) {
    this.crearEstudiante();
  }


  ngOnInit(): void {
    const idRutaActual = this.router.url;
    console.log(idRutaActual);
    if (idRutaActual != '/admin/estudiante/crearEstudiante') {
      this.cargarEstudiante();
      this.obtenerEstudiante();
      this.getGenero();
      this.getAvatar(this.pagina);
      this.getSemestre();
      this.getPrograma();
      this.getEstado();
      this.setEstado();
      this.setSemestre();
      this.setGenero();
      this.setPrograma();
    }else{
      this.cargarEstudiante();
      this.crearEstudiante();
      this.getGenero();
      this.getAvatar(this.pagina);
      this.getSemestre();
      this.getPrograma();
      this.getEstado();

    }


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

  obtenerEstudiante() {
    let usuarioResp: Estudiante = JSON.parse(String(localStorage.getItem("usuario")));
    this.setEstudiante(usuarioResp);
    this.idEstado = usuarioResp.idEstado;
    this.idGenero = usuarioResp.idGenero;
    this.idProgramas = usuarioResp.idPrograma;
    this.idSemestre = usuarioResp.idSemestre;
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

  setEstado() {
    this.estadoService.consultarPorId(this.idEstado!).subscribe(data => {
      this.nombreEstado = data.estado;
      this.estado = this.nombreEstado ?? "";
    });
  }

  setSemestre() {
    this.semestreService.consultarPorId(this.idSemestre!).subscribe(data => {
      this.nombreSemestre = data.nombre;
      this.semestre = this.nombreSemestre ?? "";
    });
  }

  setGenero() {
    this.generoService.consultarPorId(this.idGenero!).subscribe(data => {
      this.nombreGenero = data.genero;
      this.genero = this.nombreGenero ?? "";
    });
  }

  setPrograma() {
    this.programaService.consultarPorId(this.idProgramas!).subscribe(data => {
      this.nombreProgramas = data.nombre;
      this.programa = this.nombreProgramas ?? "";
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
    if (this.pagina <= 0) {
      this.pagina = 0;

    } else {
      this.pagina = this.avatares.length - 1;
      this.getAvatar(this.pagina);

    }
  }
  pasarDer() {
    this.pagina = this.pagina + 1;
    this.getAvatar(this.pagina);

  }

  seleccionarAvatar(id: any) {
    this.idAvatar = id.idAvatar;
    const images = document.querySelectorAll('img');
    let seleccionado = document.getElementById(id.idAvatar);
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
    const nombre = this.form.value.nombre;
    const apellido = this.form.value.apellido;
    const nickName = this.form.value.nickName;
    const nacimiento: Date = this.form.value.fechaNacimiento;
    const correo = this.form.value.correo;
    const programa = this.form.value.idPrograma
    const semestre = this.form.value.idSemestre;
    const avatar = this.idAvatar;
    const genero = this.form.value.idGenero;
    const estado = this.form.value.idEstado;
    const usuarioCreador = this.form.value.usuarioCreador;
    const moment = require('moment-timezone');
    const pais = 'Colombia';
    const fechaActual = moment().tz(pais).format();
    let estudiante: Estudiante = {
      nombre: nombre, apellido: apellido, nickName: nickName, puntaje: 0, monedasObtenidas: 0, idSemestre: semestre.idSemestre, idAvatar: avatar, idGenero: genero.idGenero, usuarioCreador: usuarioCreador,
      fechaCreacion: fechaActual, fechaNacimiento: nacimiento, idPrograma: programa.idPrograma, correo: correo, idEstado: estado.idEstado
    }
    this.estudianteService.crearEstudiante(estudiante).subscribe(data => {
      if (data) {
        Swal.fire({
          icon: 'success',
          title: data,
          showConfirmButton: false,
          timer: 1500
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
        timer: 1500
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
  cargarEstudiante() {
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if (id) {
          this.estudianteService.consultarPorId(id).subscribe((data) => {
            this.estudiante = data;
            this.setEstudiante(this.estudiante);
          });
        }
      }
    );
  }

  actualizar(): void {
    const nombre = this.form.value.nombre;
    const apellido = this.form.value.apellido;
    const nickName = this.form.value.nickName;
    const nacimiento: Date = this.form.value.fechaNacimiento;
    const correo = this.form.value.correo;
    const programa = this.form.value.idPrograma;
    const semestre = this.form.value.idSemestre;
    const avatar = this.idAvatar;
    const puntaje = this.form.value.puntaje;
    const genero = this.form.value.idGenero;
    const estado = this.form.value.idEstado;
    const monedas = this.form.value.monedasObtenidas;
    const usuarioModificador = this.form.value.usuarioModificador;
    const moment = require('moment-timezone');
    const pais = 'Colombia';
    const fechaActual = moment().tz(pais).format();
    let estudiante: Estudiante = {
      idEstudiante: this.form.value.idEstudiante, nombre: nombre, apellido: apellido, nickName: nickName, puntaje: puntaje, fechaNacimiento: nacimiento, correo: correo, usuarioCreador: this.estudiante.usuarioCreador, usuarioModificador: usuarioModificador, fechaCreacion: this.estudiante.fechaCreacion,
      fechaModificacion:fechaActual, idPrograma: programa.idPrograma, idEstado: estado.idEstado, idSemestre: semestre.idSemestre, idAvatar: avatar, idGenero: genero.idGenero, monedasObtenidas: monedas
    }
    this.estudianteService.actualizarEstudiante(estudiante).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/admin/estudiante/listar-estudiantes']);
    }, (e) => {
      this.hayErrores = true;
      this.mensajeError = e['error'];
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  atras() {
    this.router.navigateByUrl('/admin/estudiante/listar-estudiantes');
  }

}
