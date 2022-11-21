import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-registro-page',
  templateUrl: './registro-page.component.html',
  styleUrls: ['./registro-page.component.css']
})
export class RegistroPageComponent implements OnInit {
  @Input() loading: boolean = false;

  constructor() {}

  ngOnInit(): void {}



}
