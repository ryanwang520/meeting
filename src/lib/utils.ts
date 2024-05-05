import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600); // Compute total hours
  const minutes = Math.floor((totalSeconds % 3600) / 60); // Compute remaining minutes
  const seconds = totalSeconds % 60; // Compute remaining seconds

  // Pad the minutes and seconds with leading zeros if needed
  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds.toFixed(0)).padStart(2, '0');

  // Format the time string in hh:mm:ss format
  if (hours > 0) {
    const paddedHours = String(hours).padStart(2, '0');
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  } else {
    return `${paddedMinutes}:${paddedSeconds}`;
  }
}
