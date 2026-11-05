import { Service, signal } from '@angular/core';
import { GameState, IsBrewSuccessfulParams } from './game-service.models';
import { Ingredient, ingredients } from '../../data/ingredients';
import { CauldronStats } from '../../models/models';
import { Difficulty, difficultyTable } from '../../data/difficulty';
import { Recipe, recipes } from '../../data/recipes';
import { getRandomNumber } from '../../utils/numbers';

@Service()
export class GameService {
  private readonly minStock = 2;
  private readonly maxStock = 15;

  private getInitGameState(): GameState {
    return {
      status: 'menu',
      score: 0,
      timeLeft: 0,
      endTime: null,
      lives: 0,
      activeRecipe: null,
      cauldronIngredients: [],
      shelfStock: {},
      difficulty: 'medium',
    };
  }

  private readonly gameState = signal<GameState>(this.getInitGameState());

  private calculateCauldron(ingredients: Ingredient[]) {
    const calculatedIngredients: CauldronStats = {
      temperature: 0,
      density: 0,
      magicPower: 0,
    };

    ingredients.forEach((ingredient) => {
      calculatedIngredients.temperature += ingredient.temperature;
      calculatedIngredients.density += ingredient.density;
      calculatedIngredients.magicPower += ingredient.magicPower;
    });

    return calculatedIngredients;
  }

  private isBrewSuccessful(params: IsBrewSuccessfulParams) {
    const { stats, recipe, tolerance } = params;

    const statKeys: (keyof CauldronStats)[] = ['temperature', 'density', 'magicPower'];

    return statKeys.every((key) => {
      const { min, max } = recipe[key];
      const value = stats[key];

      return value >= min - tolerance && value <= max + tolerance;
    });
  }

  private pickRecipe(params: { difficulty: Difficulty; excludeId?: string }): Recipe | null {
    const { difficulty, excludeId } = params;

    const recipesWithoutPrevious = recipes.filter(
      (recipeItem) => recipeItem.difficulty === difficulty && recipeItem.id !== excludeId,
    );

    if (!recipesWithoutPrevious.length) {
      return null;
    }

    const randomIndex = getRandomNumber({ min: 0, max: recipesWithoutPrevious.length - 1 });

    return recipesWithoutPrevious[randomIndex];
  }

  private generateStock() {
    const shelfStock: Record<string, number> = {};
    ingredients.forEach((ingredient) => {
      shelfStock[ingredient.id] = getRandomNumber({ min: this.minStock, max: this.maxStock });
    });

    return shelfStock;
  }

  startGame() {
    this.gameState.update((state): GameState => {
      const { lives, startingTime } = difficultyTable[state.difficulty];

      return {
        ...state,
        status: 'playing',
        score: 0,
        timeLeft: startingTime,
        endTime: Date.now() + startingTime * 1000,
        lives,
        activeRecipe: this.pickRecipe({ difficulty: state.difficulty }),
        cauldronIngredients: [],
        shelfStock: this.generateStock(),
      };
    });
  }

  brew() {}
}
