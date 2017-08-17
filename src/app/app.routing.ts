import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserSingleComponent } from './users/user-single/user-single.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  { path: 'users', component: UsersComponent,
  children: [
    { path: '', component: UserListComponent },
    { path: 'create', component: UserCreateComponent },
    { path: ':id', component: UserSingleComponent },
    { path: ':id/edit', component: UserEditComponent }
  ]
},
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
