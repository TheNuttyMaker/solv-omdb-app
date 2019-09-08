import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbService } from '../services/omdb.service';
import { Movie } from '../models/movie';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  imdbId: string;
  movie: Movie;
  rating = 1;
  category: string;
  constructor(
    private route: ActivatedRoute,
    private omdbService: OmdbService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.imdbId = this.route.snapshot.paramMap.get('imdbID');
    if (this.imdbId) {
      this.getMovie(this.imdbId);
    }
  }

  getMovie(imdbID: string) {
    this.omdbService.getMovie(imdbID).subscribe(
      (movie: Movie) => {
        this.movie = movie;
        console.log(movie);
      },
      error => {
        console.log(error);
      }
    );
  }

  selectCategory(category: string) {
    this.category = category;
  }

  saveUserInputs() {
    this.movie.userRating = this.rating;
    this.movie.userCategory = this.category;
    this.omdbService.saveMovieInLocal(this.movie).subscribe(
      response => {
        console.log('success', response);
        this.alertService.success('Movie Rating and Category saved successfully!');
      },
      error => {
        console.log('error', error);
        this.alertService.danger(`Error ${error}`);
      }
    );
  }
}
