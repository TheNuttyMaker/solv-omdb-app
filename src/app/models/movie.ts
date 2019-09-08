export class Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;

  Actors?: string;
  Awards?: string;
  BoxOffice?: string;
  Country?: string;
  DVD?: string;
  Director?: string;
  Genre?: string;
  Language?: string;
  Metascore?: string;
  Plot?: string;

  Production?: string;
  Rated?: string;
  Released?: string;
  Response?: string;
  Runtime?: string;

  Website?: string;
  Writer?: string;

  imdbRating?: string;
  imdbVotes?: string;

  Ratings?: Rating[] | [];
}

export class Rating {
  Source: string;
  Value: string;
}
