import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';  // Importa el AuthGuard

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',  // Redirigir a la página de login por defecto
    pathMatch: 'full'     // Verificar coincidencia exacta con la ruta vacía
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]  // Protege la ruta 'home' con el guard de autenticación
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactPageModule),
    canActivate: [AuthGuard]  // Protege la ruta 'contact' con el guard de autenticación
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: '**',
    redirectTo: 'login',  // Cualquier ruta no existente redirige al login
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })  // Precargar todos los módulos para mejorar el rendimiento
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
