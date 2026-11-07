const SECONDS_IN_MINUTE = 60;

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / SECONDS_IN_MINUTE);
  const restSeconds = seconds - Math.floor(seconds / SECONDS_IN_MINUTE) * SECONDS_IN_MINUTE;

  return `${minutes < 10 ? '0' : ''}${minutes}:${restSeconds < 10 ? '0' : ''}${restSeconds}`;
}
