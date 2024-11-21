import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-cards',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './movie-cards.component.html',
  styleUrl: './movie-cards.component.css',
})
export class MovieCardsComponent implements OnInit {
  private _http: HttpClient;
  movies: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this._http = http;
  }

  ngOnInit(): void {
    this.fetchMovies();
    this.route.params.subscribe((params) => {
      console.log('Route parameters:', params);
    });
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
}
