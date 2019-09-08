import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbService } from '../services/omdb.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  imdbId: string;
  movie: Movie;
  rating = 1;
  constructor(private route: ActivatedRoute, private omdbService: OmdbService) {}

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
}
