import { Component } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { GameBoard } from './game-board/game-board';

@Component({
  imports: [Header, Footer, GameBoard],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
