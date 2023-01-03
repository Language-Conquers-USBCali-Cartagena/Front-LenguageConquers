import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Avatar } from 'src/app/shared/models/avatar';
import { Estado } from 'src/app/shared/models/estado';
import { Estudiante } from 'src/app/shared/models/estudiante';
import { Genero } from 'src/app/shared/models/genero';
import { Programa } from 'src/app/shared/models/programa';
import { Semestre } from 'src/app/shared/models/semestre';
import { AvatarService } from 'src/app/shared/services/avatar/avatar.service';
import { EstadoService } from 'src/app/shared/services/estado/estado.service';
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
  form!: UntypedFormGroup;
  generos: Genero[] = [];
  avatares: Avatar[] = [];
  semestres: Semestre[] = [];
  programas: Programa[] = [];
  estados: Estado[] = [];
  correo: string = '';
  pagina: number = 0;
  idAvatar: number = 0;
  esActualizar: boolean = true;

  constructor(private fb: UntypedFormBuilder, private generoService: GeneroService, private semestreService: SemestreService,private avatarService: AvatarService,

    private router:Router, private programaService: ProgramaService, private estadoService: EstadoService) {

      this.form = this.fb.group({
        nombre:  ['', Validators.required],
        apellido: ['', Validators.required],
        nickName: ['', Validators.required],
        semestre: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        correo: ['', Validators.required],
        usuarioCreador: ['', Validators.required],
        fechaCreacion: ['', Validators.required],
        avatar: ['', Validators.required],
        genero: ['', Validators.required],
        programa: ['', Validators.required],
        estado: ['', Validators.required],
      })
     }

  ngOnInit(): void {
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

  crearEstudiante(){
    const nombre = this.form.value.nombre;
    const apellido = this.form.value.apellido;
    const nickName = this.form.value.nickName;
    const nacimiento: Date = this.form.value.fechaNacimiento;
    const correo = this.correo;
    const programa = this.form.value.programa.idPrograma
    const semestre = this.form.value.semestre.idSemestre;
    const avatar = this.idAvatar;
    const genero = this.form.value.genero.idGenero;
    let estudiante: Estudiante = {nombre: nombre, apellido: apellido, nickName: nickName, idSemestre: semestre, idAvatar: avatar, idGenero: genero, usuarioCreador: 'Admin',
                                  fechaCreacion: new Date(), fechaNacimiento: nacimiento, idPrograma: programa, correo: correo, idEstado: 1}

    Swal.fire({
      icon: 'success',
      title: 'El Estudiante se ha creado Exitosamente',
      showConfirmButton: false,
      timer: 1500
    })
    //this.router.navigate(['/usuarios/listar-usuarios']);

  }


  atras(){
    this.router.navigateByUrl('/admin/usuarios/listar-usuarios');
  }

}
