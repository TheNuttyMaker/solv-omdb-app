import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { OmdbService } from '../services/omdb.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  movies: Movie[] = [];
  constructor(private omdbService: OmdbService) {}

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.omdbService.getMoviesFromLocal().subscribe((movies: Movie[]) => {
      this.movies = movies;
      console.log(this.movies);
    });
  }
}
