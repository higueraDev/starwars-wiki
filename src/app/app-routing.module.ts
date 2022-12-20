import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { CharactersDetailComponent } from './pages/characters-detail/characters-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    data:{
      breadcrumbTitle: 'Home'
    },
  },
  {
    path: 'movie-details/:filmNumber',
    component: MovieDetailsComponent,
    data:{
      breadcrumbTitle: 'Movie Details'
    },
  },
  {
    path: 'character-details/:characterName',
    component: CharactersDetailComponent,
    data:{
      breadcrumbTitle: 'Character Details'
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
