import { Component, OnInit } from '@angular/core';
import { MovieCardsComponent } from '../movie-cards/movie-cards.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCardsComponent, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private _http: HttpClient;
  movies: any[] = [];
  genres: any[] = [];
  genre!: string;
  selectedItem: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this._http = http;
  }

  ngOnInit(): void {
    this.fetchMovies();
    this.fetchMovieGenres();
    this.getDateRange();
    this.route.params.subscribe((params) => {
      console.log('Route parameters:', params);
    });
  }

  getSelectedGenre(): void {
    console.log('Selected Genre:', this.genre);
  }

  getDateRange() {
    let today = new Date();
    this.getFormattedDate(today);
    let sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    this.getFormattedDate(sixtyDaysAgo);
  }

  getFormattedDate(dt: Date) {
    const formatTwoDigits = (num: number) => (num < 10 ? '0' + num : num);

    const day = formatTwoDigits(dt.getDate());
    const month = formatTwoDigits(dt.getMonth() + 1);
    const year = dt.getFullYear();

    alert(`Date: ${day}/${month}/${year}`);
  }

  async fetchMovies(): Promise<void> {
    const apiUrl = environment.BASE_URL + environment.API_KEY;

    this.http.get(apiUrl).subscribe({
      next: (response: any) => {
        this.movies = response.results;
        console.log(this.movies);
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      },
      complete: () => {
        console.log('Movie fetch complete');
      },
    });
  }

  async fetchMovieGenres(): Promise<void> {
    const apiUrl = environment.GENRE_URL + environment.API_KEY;
    this.http.get(apiUrl).subscribe({
      next: (response: any) => {
        this.genres = response.genres;
        console.log(this.genres);
      },
      error: (error) => {
        console.error('Error fetching genres:', error);
      },
      complete: () => {
        console.log('Genre fetch complete');
      },
    });
  }
}
