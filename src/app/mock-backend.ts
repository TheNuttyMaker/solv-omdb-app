import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from './models/user';
import { Movie } from './models/movie';

// get registered users from local storage
let users: User[] = JSON.parse(localStorage.getItem('users')) || [];

const movies: Movie[] = JSON.parse(localStorage.getItem('movies')) || [];

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(200))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users/register') && method === 'POST':
          return register();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'DELETE':
          return deleteUser();
        case url.endsWith('/movie') && method === 'POST':
          return saveMovie();
        case url.endsWith('/movies') && method === 'GET':
          return getMovies();
        case url.match('/movies') && method === 'DELETE':
          return deleteMovies();
        default:
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { email, password } = body;
      const user = users.find(x => x.email === email && x.password === password);
      if (!user) {
        return error('Email Id or password is incorrect');
      }
      return ok({
        id: user.id,
        email: user.email,
        name: user.name,
        contact: user.contact,
        address: user.address,
        token: 'fake-jwt-token'
      });
    }

    function register() {
      const user: User = body;

      if (users.find(x => x.email === user.email)) {
        return error('Email Id "' + user.email + '" is already taken');
      }

      user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));

      return ok();
    }

    function getUsers() {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      return ok(users);
    }

    function deleteUser() {
      if (!isLoggedIn()) {
        return unauthorized();
      }

      users = users.filter(x => x.id !== idFromUrl());
      localStorage.setItem('users', JSON.stringify(users));
      return ok();
    }

    // Functions for handling OMDB movies data

    function getMovies() {
      return ok(movies);
    }

    function saveMovie() {
      const movie: Movie = body;

      const movieIndex = movies.findIndex(x => x.imdbID === movie.imdbID);
      if (movieIndex >= 0) {
        movies.splice(movieIndex, 1, movie);
      } else {
        movies.push(movie);
      }

      localStorage.setItem('movies', JSON.stringify(movies));

      return ok();
    }

    function deleteMovies() {
      localStorage.setItem('movies', JSON.stringify([]));
      return ok(movies);
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const mockBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: MockBackendInterceptor,
  multi: true
};
