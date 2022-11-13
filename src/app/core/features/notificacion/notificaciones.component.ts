import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<NotificacionesComponent>) {}

  ngOnInit(): void {

  }
  atras(): void {
    this.dialogRef.close();
  }

}
