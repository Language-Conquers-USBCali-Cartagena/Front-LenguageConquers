import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-terminoscondiciones',
  templateUrl: './terminoscondiciones.component.html',
  styleUrls: ['./terminoscondiciones.component.css']
})
export class TerminoscondicionesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TerminoscondicionesComponent>) { }

  ngOnInit(): void {
  }
  cerrar(): void {
    this.dialogRef.close();
  }

}
