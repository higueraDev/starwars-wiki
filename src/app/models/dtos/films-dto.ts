import { Film } from "../entities/film";

export interface FilmsDto {
  count:    number;
  next:     null;
  previous: null;
  results:  Film[];
}
