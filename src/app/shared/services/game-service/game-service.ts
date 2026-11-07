import { computed, Service, signal } from '@angular/core';
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

  readonly status = computed(() => this.gameState().status);
  readonly score = computed(() => this.gameState().score);
  readonly timeLeft = computed(() => this.gameState().timeLeft);
  readonly endTime = computed(() => this.gameState().endTime);
  readonly lives = computed(() => this.gameState().lives);
  readonly activeRecipe = computed(() => this.gameState().activeRecipe);
  readonly cauldronIngredients = computed(() => this.gameState().cauldronIngredients);
  readonly shelfStock = computed(() => this.gameState().shelfStock);
  readonly difficulty = computed(() => this.gameState().difficulty);

  readonly cauldronStats = computed(() => this.calculateCauldron(this.cauldronIngredients()));

  readonly canBrew = computed(() =>
    Boolean(
      this.status() === 'playing' && this.activeRecipe() && this.cauldronIngredients().length,
    ),
  );

  readonly maxIngredientsInCauldron = computed(
    () => difficultyTable[this.difficulty()].maxIngredientsInCauldron,
  );

  readonly isCauldronFull = computed(
    () => this.cauldronIngredients().length >= this.maxIngredientsInCauldron(),
  );

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

  addIngredient(ingredientId: string) {
    const ingredient = ingredients.find((item) => item.id === ingredientId);
    const stock = this.shelfStock()[ingredientId] ?? 0;

    if (!ingredient || this.status() !== 'playing' || stock < 1 || this.isCauldronFull()) {
      return false;
    }

    this.gameState.update((state): GameState => ({
      ...state,
      shelfStock: { ...state.shelfStock, [ingredientId]: stock - 1 },
      cauldronIngredients: [...state.cauldronIngredients, ingredient],
    }));

    return true;
  }

  brew() {
    const activeRecipe = this.activeRecipe();

    if (!this.canBrew() || !activeRecipe) {
      return null;
    }

    const { recipeTolerance, scorePerBrew } = difficultyTable[this.difficulty()];
    const isSuccess = this.isBrewSuccessful({
      stats: this.cauldronStats(),
      recipe: activeRecipe,
      tolerance: recipeTolerance,
    });

    this.gameState.update((state): GameState => {
      const score = isSuccess ? state.score + scorePerBrew : state.score;
      const lives = isSuccess ? state.lives : state.lives - 1;
      const isCabinetEmpty = Object.values(state.shelfStock).every((stock) => stock === 0);
      const isGameOver = isCabinetEmpty || lives === 0;
      const nextRecipe =
        isSuccess && !isGameOver
          ? this.pickRecipe({ difficulty: state.difficulty, excludeId: activeRecipe.id })
          : state.activeRecipe;

      return {
        ...state,
        status: isGameOver ? 'game-over' : state.status,
        score,
        lives,
        activeRecipe: nextRecipe,
        cauldronIngredients: [],
      };
    });

    return isSuccess;
  }

  pauseGame() {
    if (this.status() !== 'playing') {
      return;
    }

    this.gameState.update((state): GameState => ({
      ...state,
      status: 'paused',
      endTime: null,
    }));
  }

  resumeGame() {
    if (this.status() !== 'paused') {
      return;
    }

    this.gameState.update((state): GameState => ({
      ...state,
      status: 'playing',
      endTime: Date.now() + state.timeLeft * 1000,
    }));
  }

  exitToMenu() {
    this.gameState.update((state): GameState => ({
      ...this.getInitGameState(),
      difficulty: state.difficulty,
    }));
  }
}
