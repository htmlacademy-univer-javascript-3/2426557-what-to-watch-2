import {MIN_PER_HOUR, SEC_PER_HOUR, SEC_PER_MINUTE} from '../consts/time.ts';

export const formatRunTime = (runTime: number) => {
  const hours = Math.floor(runTime / MIN_PER_HOUR);
  const minutes = Math.floor(runTime % MIN_PER_HOUR);

  return `${hours}h ${minutes}m`;
};

export function getLeftTime(duration: number, currentTime: number): string {
  const time = duration - currentTime;
  const hours = Math.floor(time / SEC_PER_HOUR);
  const minutes = Math.floor((time % SEC_PER_HOUR) / SEC_PER_MINUTE);
  const seconds = Math.floor(time - hours * SEC_PER_HOUR - minutes * SEC_PER_MINUTE);

  return hours > 0
    ? `-${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    : `-${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
