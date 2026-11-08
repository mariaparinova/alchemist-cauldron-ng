import { Recipe } from '../../data/recipes';
import { Ingredient } from '../../data/ingredients';
import { Difficulty } from '../../data/difficulty';
import { CauldronStats, GameStatus } from '../../models/models';

export interface GameState {
  status: GameStatus;
  score: number;
  timeLeft: number;
  endTime: null | number;
  lives: number;
  activeRecipe: null | Recipe;
  cauldronIngredients: Ingredient[];
  shelfStock: Record<string, number>; // ingredient id -> portions left
  difficulty: Difficulty; // Level 2+
  lastReactionId?: string | null; // Level 3+
}

export interface IsBrewSuccessfulParams {
  stats: CauldronStats;
  recipe: Recipe;
  tolerance: number;
}
