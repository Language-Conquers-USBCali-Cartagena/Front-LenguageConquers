import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Genero } from '../../../../shared/models/genero';
import { Avatar } from '../../../../shared/models/avatar';
import { Semestre } from '../../../../shared/models/semestre';
import { GeneroService } from '../../../../shared/services/genero/genero.service';
import { SemestreService } from '../../../../shared/services/semestre/semestre.service';
import { AvatarService } from '../../../../shared/services/avatar/avatar.service';
import { ServiciosLoginService } from '../../../../shared/services/Login/servicios-login.service';
import { Estudiante } from '../../../../shared/models/estudiante';
import { Router } from '@angular/router';
import { ProgramaService } from '../../../../shared/services/programa/programa.service';
import { Programa } from '../../../../shared/models/programa';
import { AuthService } from '../../../../core/service/auth.service';
import { Observable, throwError } from 'rxjs';
import { CarusselAvataresComponent } from 'src/app/core/features/carussel-avatares/carussel-avatares.component';
import { prodErrorMap } from 'firebase/auth';
import { catchError } from 'rxjs/internal/operators/catchError';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-estudiante',
  templateUrl: './formulario-estudiante.component.html',
  styleUrls: ['./formulario-estudiante.component.css']
})
export class FormularioEstudianteComponent implements OnInit {


  form: UntypedFormGroup;
  generos: Genero[] = [];
  avatares: Avatar[] = [];
  semestres: Semestre[] = [];
  programas: Programa[] = [];
  correo: string = '';
  terminos= true;

  pagina: number = 0;
  idAvatar: number = 0;

  public user$:Observable<any> = this.authService.afauth.user;

  constructor(private fb: UntypedFormBuilder, private generoService: GeneroService, private semestreService: SemestreService,private avatarService: AvatarService,

              private loginService: ServiciosLoginService, private router:Router, private programaService: ProgramaService,  private authService: AuthService) {
    this.form = this.fb.group({
      nombre:  ['', Validators.required],
      apellido: ['', Validators.required],
      nickName: ['', Validators.required],
      semestre: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      avatar: ['', Validators.required],
      genero: ['', Validators.required],
      programa: ['', Validators.required],
    })
   }

  ngOnInit(): void {
      this.getGenero();
      this.getAvatar(this.pagina);
      this.getSemestre();
      this.getPrograma();
      this.user$.subscribe(res =>
        {this.correo = res.email
      });
  }

  crearEstudiante(){
    const correo = this.correo;
    const nombre = this.form.value.nombre;
    const apellido = this.form.value.apellido;
    const nickName = this.form.value.nickName;
    const semestre = this.form.value.semestre.idSemestre;
    const avatar = this.idAvatar;
    const genero = this.form.value.genero.idGenero;
    const nacimiento: Date = this.form.value.fechaNacimiento;
    const programa = this.form.value.programa.idPrograma
    let estudiante: Estudiante = {nombre: nombre, apellido: apellido, nickName: nickName, idSemestre: semestre, idAvatar: avatar, idGenero: genero, usuarioCreador: 'Admin',
                                  fechaCreacion: new Date(), fechaNacimiento: nacimiento, idPrograma: programa, correo: correo, idEstado: 1}
    this.loginService.createEstudiante(estudiante).subscribe(resp =>{
      localStorage.setItem("correo", correo);
      Swal.fire({
        icon: 'success',
        title: resp,
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigateByUrl('/estudiante/menu');
    }, err =>{
      console.log(err['error']);
      Swal.fire({ icon: 'error', text: err['error'], confirmButtonColor: '#33b5e5',});
      localStorage.setItem("correo", correo);
      this.router.navigateByUrl('/auth/login');
    })

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
  salir(){
    this.router.navigateByUrl("/logout");
  }
}
