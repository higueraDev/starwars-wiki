import { FilmDto } from "./film-dto";

export interface FilmsDto {
  count:    number;
  next:     any;
  previous: any;
  results:  FilmDto[];
}
