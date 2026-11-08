import { Component, inject } from '@angular/core';
import { GameService } from '../../../shared/services/game-service/game-service';
import { formatTime } from '../../../shared/utils/time';

@Component({
  imports: [],
  selector: 'app-timer',
  styleUrl: './timer.scss',
  templateUrl: './timer.html',
})
export class Timer {
  protected readonly gameService = inject(GameService);
  protected readonly formatTime = formatTime;
}
