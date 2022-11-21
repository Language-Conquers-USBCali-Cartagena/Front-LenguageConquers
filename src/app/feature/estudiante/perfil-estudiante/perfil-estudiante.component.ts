import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Estudiante } from 'src/app/shared/models/estudiante';

@Component({
  selector: 'app-perfil-estudiante',
  templateUrl: './perfil-estudiante.component.html',
  styleUrls: ['./perfil-estudiante.component.css']
})
export class PerfilEstudianteComponent implements OnInit {

  estudiante: Estudiante = {};
  mode: ProgressSpinnerMode = 'determinate';
  value = 70;


  constructor() { }

  ngOnInit(): void {}




}
