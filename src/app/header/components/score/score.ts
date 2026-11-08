import { Component, inject } from '@angular/core';
import { GameService } from '../../../shared/services/game-service/game-service';

@Component({
  imports: [],
  selector: 'app-score',
  styleUrl: './score.scss',
  templateUrl: './score.html',
})
export class Score {
  protected readonly gameService = inject(GameService);
}
