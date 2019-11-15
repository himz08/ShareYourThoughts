import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';

const appRoutes : Routes = [
    {path : 'auth' , component : AuthComponent},
    {path : 'home' , component : HomeComponent },
    {path : '**' , redirectTo : '/home'}
]



@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
export class AppRoutingModule  {

}