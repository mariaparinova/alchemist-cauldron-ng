import { Component, inject } from '@angular/core';
import { GameService } from '../../../shared/services/game-service/game-service';

@Component({
  imports: [],
  selector: 'app-recipe-card',
  styleUrl: './recipe-card.scss',
  templateUrl: './recipe-card.html',
})
export class RecipeCard {
  private readonly gameService = inject(GameService);
  protected readonly activeRecipe = this.gameService.activeRecipe;
  protected readonly maxIngredientsInCauldron = this.gameService.maxIngredientsInCauldron;
  protected readonly cauldronIngredients = this.gameService.cauldronIngredients;
  protected readonly isCauldronFull = this.gameService.isCauldronFull;
}
