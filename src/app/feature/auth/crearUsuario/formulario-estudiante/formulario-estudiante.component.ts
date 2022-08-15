import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formulario-estudiante',
  templateUrl: './formulario-estudiante.component.html',
  styleUrls: ['./formulario-estudiante.component.css']
})
export class FormularioEstudianteComponent implements OnInit {
  form: FormGroup;
  generos: Genero[] = [];
  avatares: Avatar[] = [];
  semestres: Semestre[] = [];
  programas: Programa[] = [];
  correo: string = '';
  terminos= true;
  public user$:Observable<any> = this.authService.afauth.user;
  constructor(private fb: FormBuilder, private generoService: GeneroService, private semestreService: SemestreService,private avatarService: AvatarService,
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
      this.getAvatar();
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
    const avatar = this.form.value.avatar.idAvatar;
    const genero = this.form.value.genero.idGenero;
    const nacimiento: Date = this.form.value.fechaNacimiento;
    const programa = this.form.value.programa.idPrograma
    let estudiante: Estudiante = {nombre: nombre, apellido: apellido, nickName: nickName, idSemestre: semestre, idAvatar: avatar, idGenero: genero, usuarioCreador: 'Admin',
                                  fechaCreacion: new Date(), fechaNacimiento: nacimiento, idPrograma: programa, correo: correo, idEstado: 1}
    this.loginService.createEstudiante(estudiante).subscribe(resp =>{
      this.router.navigateByUrl('/estudiante/menu/'+ correo);
    }, err =>{
      console.log(err);

      this.router.navigateByUrl('/estudiante/menu/'+ correo);
    })

  }
  getGenero(){
    this.generoService.getGenero().subscribe(resp => this.generos = resp);
  }
  getSemestre(){
    this.semestreService.getSemestre().subscribe(resp => this.semestres = resp);
  }
  getAvatar(){
    this.avatarService.getAvatar().subscribe(resp => this.avatares = resp);
  }
  getPrograma(){
    this.programaService.getProgramas().subscribe(resp => this.programas = resp)
  }
  salir(){
    this.authService.logout()
    this.router.navigateByUrl("/auth/login");
  }
}
