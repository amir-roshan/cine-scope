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
  selectedGenreId!: number;

  currentPage!: number;
  totalPages!: number;

  BASE_URL: string = environment.BASE_URL + environment.API_KEY;
  SELECTED_GENRE_URL: string =
    environment.BASE_URL + environment.API_KEY + environment.SELECT_GENRE;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this._http = http;
  }

  ngOnInit(): void {
    this.fetchMovies(this.BASE_URL);
    this.fetchMovieGenres();
    this.getDateRange();
    this.route.params.subscribe((params) => {
      console.log('Route parameters:', params);
    });
  }

  getSelectedGenre(): void {
    const selectedGenre = this.genres.find(
      (genre) => genre.name === this.genre
    );
    if (selectedGenre) {
      this.selectedGenreId = selectedGenre.id;
      console.log('Selected Genre ID:', this.selectedGenreId);
      console.log('Selected Genre:', this.genre);
      this.fetchMovies(this.SELECTED_GENRE_URL + selectedGenre.id.toString());
      console.log(this.SELECTED_GENRE_URL + selectedGenre.id.toString());
    } else {
      console.log('Genre not found');
    }
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

    console.log(`Date: ${day}/${month}/${year}`);
  }

  async fetchMovies(url: string, page: number | null = null): Promise<void> {
    if (page) url += `&page=${page}`;
    this.http.get(url).subscribe({
      next: (response: any) => {
        const allMovies = response.results;
        this.movies = allMovies.slice(0, 8);
        this.currentPage = response.page;
        this.totalPages = Math.ceil(response.total_results / 8);
        console.log(this.movies);
        console.log('Current Page', this.currentPage);
        console.log('Total Pages', this.totalPages);
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

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      if (!this.genre) {
        this.fetchMovies(this.BASE_URL, this.currentPage + 1);
      } else {
        this.fetchMovies(
          this.SELECTED_GENRE_URL + this.selectedGenreId.toString(),
          this.currentPage + 1
        );
      }
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      if (!this.genre) {
        this.fetchMovies(this.BASE_URL, this.currentPage - 1);
      } else {
        this.fetchMovies(
          this.SELECTED_GENRE_URL + this.selectedGenreId.toString(),
          this.currentPage - 1
        );
      }
    }
  }
}
