import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Genero } from '../../../../shared/models/genero';
import { Avatar } from '../../../../shared/models/avatar';
import { Semestre } from '../../../../shared/models/semestre';
import { GeneroService } from '../../../../shared/services/genero/genero.service';
import { SemestreService } from '../../../../shared/services/semestre/semestre.service';
import { AvatarService } from '../../../../shared/services/avatar/avatar.service';

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
  terminos= true;
  constructor(private fb: FormBuilder, private generoService: GeneroService, private semestreService: SemestreService,private avatarService: AvatarService) {
    this.form = this.fb.group({
      nombre:  ['', Validators.required],
      apellido: ['', Validators.required],
      nickName: ['', Validators.required],
      semestre: ['', Validators.required],
      avatar: ['', Validators.required],
      genero: ['', Validators.required],
    })
   }

  ngOnInit(): void {
      this.getGenero();
      this.getAvatar();
      this.getSemestre();
  }

  crearEstudiante(){
    const nombre = this.form.value.nombre;
    const apellido = this.form.value.apellido;
    const nickName = this.form.value.nickName;
    const semestre = this.form.value.semestre;
    const avatar = this.form.value.avatar;
    const genero = this.form.value.genero;

    console.log(nombre);
    console.log(apellido);
    console.log(nickName);
    console.log(semestre);
    console.log(avatar);
    console.log(genero);
    
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
}
