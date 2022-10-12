import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { NotificacionesComponent } from '../notificaciones/notificaciones.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent  {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(NotificacionesComponent, {
      width: '500px',
      height: '250px',
      
    });
  }
}
