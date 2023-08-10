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
import { EditComponent } from './forum/edit/edit.component';
import { ProfileComponent } from './profile/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
    data: { animation: 'homepage' },
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
    canActivate: [GuestGuardService],
    data: { animation: 'loginpage' },
  },
  {
    path: 'register',
    title: 'Register',
    component: RegisterComponent,
    canActivate: [GuestGuardService],
    data: { animation: 'registerpage' },
  },
  {
    path: 'profile',
    title: 'My Profile',
    component: ProfileComponent,
    canActivate: [UserGuardService],
    data: { animation: 'profilepage' },
  },
  {
    path: 'board',
    title: 'Board',
    component: BoardComponent,
    data: { animation: 'boardpage' },
  },
  {
    path: 'post/:id',
    title: 'Post details',
    component: PostComponent,
    data: { animation: 'postpage' },
  },
  {
    path: 'add',
    title: 'Add post',
    component: AddComponent,
    canActivate: [UserGuardService],
    data: { animation: 'addpage' },
  },
  {
    path: 'edit/:id',
    title: 'Edit post',
    component: EditComponent,
    canActivate: [UserGuardService],
    data: { animation: 'editpage' },
  },
  {
    path: '**',
    component: NotfoundComponent,
    data: { animation: 'notfoundpage' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
