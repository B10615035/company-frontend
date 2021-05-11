import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ChooseStudentComponent } from './choose-student/choose-student.component';
import { LoginComponent } from './login/login.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  // {path:'', component:ChooseStudentComponent, canActivate:[AuthGuard]},
  {path:'', component:ScheduleComponent, canActivate:[AuthGuard]},
  // {path:'chooseStudent', component:ChooseStudentComponent, canActivate:[AuthGuard]},
  {path:'schedule', component:ScheduleComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
