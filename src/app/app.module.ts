// import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatCardModule,
  MatSliderModule,
  MatPaginatorModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { mockBackendProvider } from './mock-backend';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExploreComponent } from './explore/explore.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { UserRatingComponent } from './user-rating/user-rating.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ExploreComponent,
    MovieDetailComponent,
    UserRatingComponent,
    HomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSliderModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    mockBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
