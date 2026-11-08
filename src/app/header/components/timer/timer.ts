import { Component, computed, DOCUMENT, effect, inject } from '@angular/core';
import { GameService } from '../../../shared/services/game-service/game-service';
import { difficultyTable } from '../../../shared/data/difficulty';
import { formatTime } from '../../../shared/utils/time';

@Component({
  imports: [],
  selector: 'app-timer',
  styleUrl: './timer.scss',
  templateUrl: './timer.html',
})
export class Timer {
  protected readonly gameService = inject(GameService);
  protected readonly formatTime = formatTime;

  private readonly timerUpdateInterval = 250;
  private readonly lowTimeWarning = 15;
  private readonly document = inject(DOCUMENT);

  protected readonly isGameActive = computed(
    () => this.gameService.status() === 'playing' || this.gameService.status() === 'paused',
  );

  protected readonly isLowTime = computed(
    () =>
      this.gameService.status() === 'playing' && this.gameService.timeLeft() < this.lowTimeWarning,
  );

  protected readonly timeProgress = computed(() => {
    const { startingTime } = difficultyTable[this.gameService.difficulty()];

    return startingTime ? (this.gameService.timeLeft() / startingTime) * 100 : 0;
  });

  constructor() {
    effect((onCleanup) => {
      if (this.gameService.status() !== 'playing') {
        return;
      }

      const intervalId = setInterval(
        () => this.gameService.updateTimeLeft(),
        this.timerUpdateInterval,
      );

      onCleanup(() => clearInterval(intervalId));
    });
  }

  protected pause(dialog: HTMLDialogElement) {
    this.gameService.pauseGame();

    if (this.gameService.status() === 'paused' && !dialog.open) {
      dialog.showModal();
    }
  }

  protected resume(dialog: HTMLDialogElement) {
    this.gameService.resumeGame();
    dialog.close();
  }

  protected exit(dialog: HTMLDialogElement) {
    this.gameService.exitToMenu();
    dialog.close();
  }

  protected onDialogCancel(params: { event: Event; dialog: HTMLDialogElement }) {
    const { event, dialog } = params;

    event.preventDefault();
    this.resume(dialog);
  }

  protected onVisibilityChange(dialog: HTMLDialogElement) {
    if (this.document.hidden) {
      this.pause(dialog);
    }
  }
}
