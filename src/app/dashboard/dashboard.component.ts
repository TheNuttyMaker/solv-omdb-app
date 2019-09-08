import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { OmdbService } from '../services/omdb.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private omdbService: OmdbService, private alertService: AlertService) {}
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
      this.alertService.success('Movies deleted successfully!');
    });
  }
}
