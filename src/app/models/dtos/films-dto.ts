import { Film } from "../entities/film";

export interface FilmsDto {
  count:    number;
  next:     any;
  previous: any;
  results:  Film[];
}
