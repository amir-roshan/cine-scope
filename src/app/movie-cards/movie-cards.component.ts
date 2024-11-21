import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-cards',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './movie-cards.component.html',
  styleUrl: './movie-cards.component.css',
})
export class MovieCardsComponent {
  @Input()
  title!: string;

  @Input()
  overview!: string;

  @Input()
  poster_path!: string;
}
