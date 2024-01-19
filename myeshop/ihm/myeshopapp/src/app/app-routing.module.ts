import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { BoutiqueComponent } from './boutique/boutique.component';

const routes: Routes = [
  { path: '', component : WelcomeComponent},
  { path: 'boutique', component : BoutiqueComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
