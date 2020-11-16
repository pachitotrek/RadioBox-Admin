import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { StreamComponent } from './components/stream/stream.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { LoginGuard } from './guards/token.guard';
import { PublicidadComponent } from './components/publicidad/publicidad.component';
import { RedesComponent } from './components/redes/redes.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent,canActivate:[LoginGuard],children:[
    {path:'stream',component:StreamComponent},
    {path:'nosotros',component:NosotrosComponent},
    {path:'calendario',component:CalendarioComponent},
    {path:'publicidad',component:PublicidadComponent},
    {path:'redes',component:RedesComponent}
  ]},
  {path:'**',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
