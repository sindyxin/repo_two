import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { DetailComponent } from './detail/detail.component';
import { UpdateComponent } from './update/update.component';


const routes: Routes = [
  { path: 'products', component: ListComponent },
  { path: 'products/new', component: NewComponent },
  { path: 'products/:id', component: DetailComponent },
  { path: 'products/edit/:id', component: UpdateComponent },
  { path: '', pathMatch: 'full', redirectTo:'/products'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
