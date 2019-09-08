import { Component, OnInit, ViewChild } from '@angular/core';
import { OmdbService } from '../services/omdb.service';
import { forkJoin } from 'rxjs';
import { MoviesResponse } from '../models/movie-response';
import { Movie } from '../models/movie';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageEvent, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  searchForm: FormGroup;
  movies: Movie[] = [];
  submitted = false;

  paginationData: PageEvent;
  totalResults = 0;
  pageSizeOptions: number[] = [10];

  constructor(private omdbService: OmdbService) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      title: new FormControl('toy story', [Validators.required]),
      year: new FormControl(null)
    });

    this.fetchMovies();
  }

  fetchMovies() {
    const pageIndex = this.paginator.pageIndex + 1;
    this.omdbService
      .getMovies(this.searchForm.value, pageIndex)
      .subscribe((response: MoviesResponse) => {
        this.movies = response.Search;
        this.totalResults = +response.totalResults;
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

  pageChange(paginationData: PageEvent) {
    this.paginationData = paginationData;
    this.fetchMovies();
  }
}
