import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-cabinet',
  styleUrl: './cabinet.scss',
  templateUrl: './cabinet.html',
})
export class Cabinet {
  shelvesAmount = signal(new Array(6));
}
