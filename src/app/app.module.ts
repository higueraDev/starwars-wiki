import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './components/home/hero/hero.component';
import { AudioComponent } from './components/common/audio/audio.component';
import { HomeComponent } from './pages/home/home.component';
import { StarsComponent } from './components/layout/stars/stars.component';
import { FilmCatalogComponent } from './components/home/film-catalog/film-catalog.component';
import { FilmComponent } from './components/common/film/film.component';
import { ImageComponent } from './components/common/image/image.component';
import { LoaderComponent } from './components/common/loader/loader.component';
import { SorterComponent } from './components/home/sorter/sorter.component';
import { FormsModule } from '@angular/forms';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { LogoComponent } from './components/common/logo/logo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    AudioComponent,
    HomeComponent,
    StarsComponent,
    FilmCatalogComponent,
    FilmComponent,
    ImageComponent,
    LoaderComponent,
    SorterComponent,
    MovieDetailsComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
