import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {jwtDecode} from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type JwtPayload = {
  exp: number; // expiration time in seconds
  [key: string]: any;
};

export function isJwtExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (!decoded.exp) return true; // if no exp, i assume expired

    const now = Math.floor(Date.now() / 1000); // current time in seconds
    return decoded.exp < now;
  } catch (e) {
    return true; // if decoding fails, i treat it as expired
  }
}
