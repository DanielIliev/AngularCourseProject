import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { GuestGuardService } from './guards/guest-guard.service';
import { BoardComponent } from './forum/board/board.component';
import { PostComponent } from './forum/post/post.component';
import { AddComponent } from './forum/add/add.component';
import { UserGuardService } from './guards/user-guard.service';

const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent },
  { path: 'login', title: 'Login', component: LoginComponent, canActivate: [GuestGuardService] },
  { path: 'register', title: 'Register', component: RegisterComponent, canActivate: [GuestGuardService] },
  { path: 'board', title: 'Board', component: BoardComponent },
  { path: 'post/:id', title: 'Post details', component: PostComponent },
  { path: 'add', title: 'Add post', component: AddComponent, canActivate: [UserGuardService]},
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
