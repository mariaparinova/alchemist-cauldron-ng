import { Component, computed, inject } from '@angular/core';
import { GameService } from '../../../shared/services/game-service/game-service';
import { ingredients } from '../../../shared/data/ingredients';

@Component({
  imports: [],
  selector: 'app-cabinet',
  styleUrl: './cabinet.scss',
  templateUrl: './cabinet.html',
})
export class Cabinet {
  protected readonly gameService = inject(GameService);
  protected readonly shelfStock = this.gameService.shelfStock;
  protected readonly isGameStatusMenu = computed(() => this.gameService.status() === 'menu');
  protected readonly isLocked = computed(
    () => this.gameService.status() !== 'playing' || this.gameService.isCauldronFull(),
  );
  protected readonly ingredientsList = ingredients;
}
