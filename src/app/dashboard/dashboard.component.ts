import { Component, OnInit, NgZone } from '@angular/core';
import { Movie } from '../models/movie';
import { OmdbService } from '../services/omdb.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private omdbService: OmdbService, private ngZone: NgZone) {}
  movies: Movie[] = [];

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.omdbService.getMoviesFromLocal().subscribe((movies: Movie[]) => {
      this.movies = movies;
      console.log(this.movies);
    });
  }

  deleteMovies() {
    this.omdbService.deleteAllMoviesFromLocal().subscribe((movies: Movie[]) => {
      console.log('Movies deleted');
      this.movies = new Array();
    });
  }
}
