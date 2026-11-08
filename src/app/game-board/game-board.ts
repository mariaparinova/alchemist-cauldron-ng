import { Component } from '@angular/core';
import { Cabinet } from './components/cabinet/cabinet';
import { RecipeCard } from './components/recipe-card/recipe-card';
import { Stats } from './components/stats/stats';

@Component({
  imports: [Cabinet, RecipeCard, Stats],
  selector: 'app-game-board',
  styleUrl: './game-board.scss',
  templateUrl: './game-board.html',
})
export class GameBoard {}
