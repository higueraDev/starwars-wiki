import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './components/hero/hero.component';
import { AudioComponent } from './components/audio/audio.component';
import { HomeComponent } from './components/home/home.component';
import { StarsComponent } from './components/stars/stars.component';
import { FilmCatalogComponent } from './components/film-catalog/film-catalog.component';
import { FilmComponent } from './components/film/film.component';
import { ImageComponent } from './components/image/image.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SorterComponent } from './components/sorter/sorter.component';
import { FormsModule } from '@angular/forms';

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
    SorterComponent
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
