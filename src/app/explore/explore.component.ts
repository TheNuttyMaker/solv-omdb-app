import { Component, OnInit } from '@angular/core';
import { OmdbService } from '../services/omdb.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  movies = [];

  constructor(private omdbService: OmdbService) {}

  ngOnInit() {
    this.omdbService.getMovies({ title: 'Batman', year: '1980' }).subscribe(response => {
      console.log(response);
    });
  }
}
