import { Component, computed, inject } from '@angular/core';
import { GameService } from '../../../shared/services/game-service/game-service';

@Component({
  imports: [],
  selector: 'app-lives',
  styleUrl: './lives.scss',
  templateUrl: './lives.html',
})
export class Lives {
  private readonly gameService = inject(GameService);
  protected readonly livesAmount = computed(() => new Array(this.gameService.lives()));
}
