import { Component } from '@angular/core';
import { MovieCardsComponent } from '../movie-cards/movie-cards.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieCardsComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
