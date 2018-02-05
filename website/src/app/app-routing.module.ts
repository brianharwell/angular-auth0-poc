import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignInCallbackComponent } from './sign-in-callback/sign-in-callback.component';
import { SignInWithLockComponent } from './sign-in-with-lock/sign-in-with-lock.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'sign-in-callback', component: SignInCallbackComponent },
    { path: 'sign-in-with-lock', component: SignInWithLockComponent },
    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
