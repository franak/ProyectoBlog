import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogGridComponent } from './blog-grid/blog-grid.component';
import { BlogEntryComponent } from './blog-entry/blog-entry.component';
import { routeGuard } from './guards/route.guard';
import { NuevaEntradaComponent } from './nueva-entrada/nueva-entrada.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: BlogGridComponent },
  { path: 'home', component: BlogGridComponent },
  { path: 'entrada/:tituloEntrada', component: BlogEntryComponent },
  { path: 'categoria/:tituloCategoria', component: BlogGridComponent },
  { path: 'nuevaEntrada', component: NuevaEntradaComponent, canActivate: [routeGuard] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
