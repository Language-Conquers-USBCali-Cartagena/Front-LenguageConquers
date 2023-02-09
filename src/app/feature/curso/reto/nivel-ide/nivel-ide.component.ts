import { Component, OnInit } from '@angular/core';
import { SideNavToggle } from 'src/app/shared/models/sideNavToggle';

@Component({
  selector: 'app-nivel-ide',
  templateUrl: './nivel-ide.component.html',
  styleUrls: ['./nivel-ide.component.css']
})
export class NivelIDEComponent implements OnInit {

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
