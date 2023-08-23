import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './graph/graph.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    GraphComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'graphs', component:GraphComponent}
    ])
  ]
})
export class GraphModule { }
