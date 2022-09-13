import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/shared/models/estudiante';
interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}
export interface PeriodicElement {
  name: string;
  avatar: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {avatar: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {avatar: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {avatar: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},


];
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  estudiante: Estudiante = {};
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  isSideNavCollapsed=false;
  screenWidth = 0;
  onToggleSideNav(data: SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
