import { Component, OnInit } from '@angular/core';
import { OmdbService } from '../services/omdb.service';
import { forkJoin } from 'rxjs';
import { MoviesResponse } from '../models/movie-response';
import { Movie } from '../models/movie';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  searchForm: FormGroup;
  movies: Movie[] = [];
  submitted = false;

  constructor(private omdbService: OmdbService) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      title: new FormControl('toy story', [Validators.required]),
      year: new FormControl(null)
    });

    this.omdbService.getMovies(this.searchForm.value).subscribe((response: MoviesResponse) => {
      this.movies = response.Search.slice(3);
      console.log(this.movies);
    });
  }

  clear() {
    console.log('clear');
    this.searchForm.reset();
  }
  onSubmit() {
    this.submitted = true;
    console.log('submit');
  }
}
