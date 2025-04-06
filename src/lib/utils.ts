import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal weight";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else if (bmi >= 30 && bmi < 35) {
    return "Obesity Class I";
  } else if (bmi >= 35 && bmi < 40) {
    return "Obesity Class II";
  } else {
    return "Obesity Class III";
  }
}
