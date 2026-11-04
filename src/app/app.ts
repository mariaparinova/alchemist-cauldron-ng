import { Component } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';

@Component({
  imports: [Header, Footer],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
