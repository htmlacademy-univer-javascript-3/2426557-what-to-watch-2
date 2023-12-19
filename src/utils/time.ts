import {SEC_PER_HOUR, SEC_PER_MINUTE} from '../consts/time.ts';

export const formatRunTime = (runTime: number) => {
  const hours = Math.floor(runTime / SEC_PER_HOUR);
  const minutes = Math.floor((runTime % SEC_PER_HOUR) / SEC_PER_MINUTE);
  const seconds = Math.floor(runTime % SEC_PER_MINUTE);

  const preparedHours = String(hours).padStart(2, '0');
  const preparedMinutes = String(minutes).padStart(2, '0');
  const preparedSeconds = String(seconds).padStart(2, '0');

  return `${preparedHours}:${preparedMinutes}:${preparedSeconds}`;
};

export function getLeftTime(duration: number) {
  const hours = Math.floor(duration / SEC_PER_HOUR);
  const minuts = Math.floor((duration % SEC_PER_HOUR) / SEC_PER_MINUTE);
  const seconds = Math.floor(duration - hours * SEC_PER_HOUR - minuts * SEC_PER_MINUTE);

  return hours > 0
    ? `-${hours.toString().padStart(2, '0')}:${minuts.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    : `-${minuts.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
