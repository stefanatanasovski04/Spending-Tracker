import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TransactionModule } from './transactions/transaction.module';
import { CategoryModule } from './categories/category.module';
import { RouterModule } from '@angular/router';
import { SpengingComponent } from './spenging/spenging.component';
import { GraphModule } from './graphs/graph.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SpengingComponent
  ],
  imports: [
    BrowserModule,
    TransactionModule,
    CategoryModule,
    GraphModule,
    RouterModule.forRoot([
      {path:'spending', component:SpengingComponent},
      {path:'', redirectTo:'spending',pathMatch:'full'},
      {path:'**', redirectTo:'spending', pathMatch:'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
