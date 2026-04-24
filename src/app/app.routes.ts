import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
    import('./pages/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/main-layout/main-layout.component')
        .then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'principal',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },
      {
        path: 'financeiro',
        loadComponent: () =>
          import('./pages/financeiro/financeiro.component')
            .then(m => m.FinanceiroComponent)
      },
      {
        path: 'financeiro-form',
        loadComponent: () =>
          import('./pages/financeiro/form/financeiro-form.component')
            .then(m => m.FinanceiroFormComponent)
      },
      {
        path: 'financeiro-form/view/:id',
        loadComponent: () =>
          import('./pages/financeiro/form/financeiro-form.component')
            .then(m => m.FinanceiroFormComponent)
      },
      {
        path: 'financeiro-form/edit/:id',
        loadComponent: () =>
          import('./pages/financeiro/form/financeiro-form.component')
            .then(m => m.FinanceiroFormComponent)
      },
      {
        path: 'membros',
        loadComponent: () =>
          import('./pages/membro/membro.component')
            .then(m => m.MembroComponent)
      },
      {
        path: 'membro-form',
        loadComponent: () =>
          import('./pages/membro/form/membro-form.component')
            .then(m => m.MembroFormComponent)
      },
      {
        path: 'membro-form/view/:id',
        loadComponent: () =>
          import('./pages/membro/form/membro-form.component')
            .then(m => m.MembroFormComponent)
      },
      {
        path: 'membro-form/edit/:id',
        loadComponent: () =>
          import('./pages/membro/form/membro-form.component')
            .then(m => m.MembroFormComponent)
      },
      {
        path: 'eventos',
        loadComponent: () =>
          import('./pages/evento/evento.component')
            .then(m => m.EventoComponent)
      },
      {
        path: 'evento-form',
        loadComponent: () =>
          import('./pages/evento/form/evento-form.component')
            .then(m => m.EventoFormComponent)
      },
      {
        path: 'evento-form/view/:id',
        loadComponent: () =>
          import('./pages/evento/form/evento-form.component')
            .then(m => m.EventoFormComponent)
      },
      {
        path: 'evento-form/edit/:id',
        loadComponent: () =>
          import('./pages/evento/form/evento-form.component')
            .then(m => m.EventoFormComponent)
      },
      {
        path: 'celulas',
        loadComponent: () =>
          import('./pages/celula/celula.component')
            .then(m => m.CelulaComponent)
      },
      {
        path: 'celula-form',
        loadComponent: () =>
          import('./pages/celula/form/celula-form.component')
            .then(m => m.CelulaFormComponent)
      },
      {
        path: 'celula-form/view/:id',
        loadComponent: () =>
          import('./pages/celula/form/celula-form.component')
            .then(m => m.CelulaFormComponent)
      },
      {
        path: 'celula-form/edit/:id',
        loadComponent: () =>
          import('./pages/celula/form/celula-form.component')
            .then(m => m.CelulaFormComponent)
      },
      {
        path: 'ministerios',
        loadComponent: () =>
          import('./pages/ministerio/ministerio.component')
            .then(m => m.MinisterioComponent)
      },
      {
        path: 'ministerio-form',
        loadComponent: () =>
          import('./pages/ministerio/form/ministerio-form.component')
            .then(m => m.MinisterioFormComponent)
      },
      {
        path: 'ministerio-form/view/:id',
        loadComponent: () =>
          import('./pages/ministerio/form/ministerio-form.component')
            .then(m => m.MinisterioFormComponent)
      },
      {
        path: 'ministerio-form/edit/:id',
        loadComponent: () =>
          import('./pages/ministerio/form/ministerio-form.component')
            .then(m => m.MinisterioFormComponent)
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./pages/usuario/usuario.component')
            .then(m => m.UsuarioComponent)
      },
      {
        path: 'usuario-form',
        loadComponent: () =>
          import('./pages/usuario/form/usuario-form.component')
            .then(m => m.UsuarioFormComponent)
      },
      {
        path: 'usuario-form/view/:id',
        loadComponent: () =>
          import('./pages/usuario/form/usuario-form.component')
            .then(m => m.UsuarioFormComponent)
      },
      {
        path: 'usuario-form/edit/:id',
        loadComponent: () =>
          import('./pages/usuario/form/usuario-form.component')
            .then(m => m.UsuarioFormComponent)
      },
      {
        path: 'upload',
        loadComponent: () =>
          import('./pages/upload/upload.component')
            .then(m => m.UploadComponent)
      },
      {
        path: '',
        redirectTo: 'principal',
        pathMatch: 'full'
      }
    ]
  }
];