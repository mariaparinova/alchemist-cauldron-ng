export const difficultyTable: DifficultyTable = {
  easy: {
    ingredientsOnShelf: 4,
    maxIngredientsInCauldron: 4,
    startingTime: 180,
    recipeTolerance: 12,
    lives: 5,
    scorePerBrew: 100,
    timeBonusPerBrew: 15,
    reactions: 0,
  },
  medium: {
    ingredientsOnShelf: 6,
    maxIngredientsInCauldron: 4,
    startingTime: 150,
    recipeTolerance: 8,
    lives: 3,
    scorePerBrew: 200,
    timeBonusPerBrew: 10,
    reactions: 2,
  },
  hard: {
    ingredientsOnShelf: 8,
    maxIngredientsInCauldron: 5,
    startingTime: 150,
    recipeTolerance: 5,
    lives: 3,
    scorePerBrew: 300,
    timeBonusPerBrew: 5,
    reactions: 3,
  },
};

type DifficultyTable = Record<Difficulty, DifficultyTableItem>;

interface DifficultyTableItem {
  ingredientsOnShelf: number;
  maxIngredientsInCauldron: number;
  startingTime: number;
  recipeTolerance: number;
  lives: number;
  scorePerBrew: number;
  timeBonusPerBrew: number;
  reactions: number;
}

export type Difficulty = 'easy' | 'medium' | 'hard';
