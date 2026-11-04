import { Component } from '@angular/core';
import { Cabinet } from './components/cabinet/cabinet';
import { Recipe } from './components/recipe/recipe';
import { Stats } from './components/stats/stats';

@Component({
  imports: [Cabinet, Recipe, Stats],
  selector: 'app-game-board',
  styleUrl: './game-board.scss',
  templateUrl: './game-board.html',
})
export class GameBoard {}
