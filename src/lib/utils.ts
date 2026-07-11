import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function lengthString(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes} minutes`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const hourString = `${hours} hour${hours > 1 ? 's' : ''}`;
  const minuteString = remainingMinutes > 0 ? `, ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}` : null;
  return `${hourString}${ minuteString ? minuteString : ''}`;
}
