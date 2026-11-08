import { Component, inject } from '@angular/core';
import { GameService } from '../../../shared/services/game-service/game-service';

@Component({
  imports: [],
  selector: 'app-stats',
  styleUrl: './stats.scss',
  templateUrl: './stats.html',
})
export class Stats {
  private readonly gameService = inject(GameService);
  protected readonly stats = this.gameService.cauldronStats;
}
