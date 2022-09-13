import { Component, OnInit } from '@angular/core';
interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}
@Component({
  selector: 'app-logros-page',
  templateUrl: './logros-page.component.html',
  styleUrls: ['./logros-page.component.css']
})
export class LogrosPageComponent implements OnInit {

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
