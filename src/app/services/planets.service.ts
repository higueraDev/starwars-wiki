import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { PlanetDto } from '../models/dtos/planet-dto';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  constructor(private http: HttpClient) {}

  getPlanet(url: string) {
    return this.http.get<PlanetDto>(url).pipe(take(1));
  }
}
