import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { InformationComponent } from './information/information.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'', component:InformationComponent, canActivate:[AuthGuard]},
  {path:'information', component:InformationComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
