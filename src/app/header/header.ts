import { Component } from '@angular/core';
import { Lives } from './components/lives/lives';
import { Score } from './components/score/score';
import { Timer } from './components/timer/timer';

@Component({
  imports: [Lives, Score, Timer],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {}
