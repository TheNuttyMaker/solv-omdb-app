import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { MoviesResponse } from '../models/movie-response';
import { Movie } from '../models/movie';

const {
  omdb: { baseUrl, apiKey }
} = environment;

@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  constructor(private http: HttpClient) {}

  public getMovie = (imbdID?: string) => {
    if (imbdID) {
      return this.http.get(`${baseUrl}/?apikey=${apiKey}&i=${imbdID}`);
    } else {
      throw new Error('No Imdb Id provided');
    }
  }

  getMovies = (
    searchParam: { title: string; year: string },
    page: number
  ): Observable<MoviesResponse> => {
    if (searchParam && (searchParam.title || searchParam.year)) {
      return this.http.get<MoviesResponse>(
        `${baseUrl}/?apikey=${apiKey}&s=${searchParam.title}&y=${searchParam.year}&page=${page}`
      );
    } else {
      throw new Error('Nothing to search!');
    }
  }

  saveMovieInLocal(movie: Movie) {
    return this.http.post(`/movie`, movie);
  }

  getMoviesFromLocal() {
    return this.http.get(`/movies`);
  }

  deleteAllMoviesFromLocal() {
    return this.http.delete(`/movies`);
  }
}
