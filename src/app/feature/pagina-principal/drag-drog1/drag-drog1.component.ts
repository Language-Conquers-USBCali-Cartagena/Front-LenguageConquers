import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, switchMap } from "rxjs/operators";
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

interface UserDetails {
  id: number;
  mision: string;
  actividad: string;
}


@Component({
  selector: 'app-drag-drog1',
  templateUrl: './drag-drog1.component.html',
  styleUrls: ['./drag-drog1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragDrog1Component implements OnInit {


  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

  }


}
