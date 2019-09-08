import { Movie } from './movie';

export class MoviesResponse {
  Response: string;
  Search?: Movie[];
  totalResults?: string;
  Error?: string;
}
