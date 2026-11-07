import { Component, inject } from '@angular/core';
import { GameService } from '../shared/services/game-service/game-service';

@Component({
  imports: [],
  selector: 'app-footer',
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly gameService = inject(GameService);
  protected readonly status = this.gameService.status;
}
