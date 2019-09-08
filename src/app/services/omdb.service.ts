import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

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

  getMovies = (searchParam: { title: string; year: string }) => {
    if (searchParam && (searchParam.title || searchParam.year)) {
      return this.http.get(
        `${baseUrl}/?apikey=${apiKey}&s=${searchParam.title}&y=${searchParam.year}`
      );
    } else {
      throw new Error('Nothing to search!');
    }
  }
}
