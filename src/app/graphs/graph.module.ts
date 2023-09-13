import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './graph/graph.component';
import { RouterModule } from '@angular/router';
import { AgChartsAngularModule } from 'ag-charts-angular';

@NgModule({
  declarations: [
    GraphComponent
  ],
  imports: [
    CommonModule,
    AgChartsAngularModule,
    RouterModule.forChild([
      {path:'graphs', component:GraphComponent}
    ])
  ]
})
export class GraphModule { }
