import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingComponent } from './ranking/ranking.component';
import { RankingRoutingsModule } from './ranking-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/shared/material/material.module';



@NgModule({
  declarations: [
    RankingComponent
  ],
  imports: [
    CommonModule,
    RankingRoutingsModule,
    CoreModule,
    MaterialModule,


  ]
})
export class RankingModule { }
