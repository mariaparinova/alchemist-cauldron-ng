import { Service } from '@angular/core';

@Service()
export class TimerService {
  private readonly msInSecond = 1000;

  calculateEndTime(timeLeft: number) {
    return Date.now() + timeLeft * this.msInSecond;
  }

  calculateTimeLeft(endTime: number) {
    return Math.max(0, Math.ceil((endTime - Date.now()) / this.msInSecond));
  }

  addTimeBonus(params: { endTime: number; bonus: number; maxTime: number }) {
    const { endTime, bonus, maxTime } = params;

    const now = Date.now();
    const remainingMs = Math.max(0, endTime - now);
    const nextRemainingMs = Math.min(
      remainingMs + bonus * this.msInSecond,
      maxTime * this.msInSecond,
    );

    return {
      endTime: now + nextRemainingMs,
      timeLeft: Math.ceil(nextRemainingMs / this.msInSecond),
    };
  }
}
