import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const BASE_DOMAIN = "https://eventle.com"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTurkish(date: string | Date): string {
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  
  return `${day} ${month} ${year}`;
}

export function capitalizeAddress(address: string): string {
  if (!address) return '';
  
  return address
    .split(' ')
    .map(word => {
      if (word.length === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

export function capitalizeTitle(title: string): string {
  if (!title) return '';
  
  return title
    .split(' ')
    .map(word => {
      if (word.length === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

export function formatDuration(duration: string): string {
  if (!duration) return '';
  
  // Eğer zaten "saat" kelimesi varsa olduğu gibi döndür
  if (duration.includes('saat')) {
    return duration;
  }
  
  // Sayısal değeri çıkar
  const match = duration.match(/\d+/);
  if (match) {
    const hours = parseInt(match[0]);
    return `${hours} saat`;
  }
  
  return duration;
}

export function translateDayToTurkish(day: string): string {
  const dayTranslations: { [key: string]: string } = {
    'monday': 'Pazartesi',
    'tuesday': 'Salı', 
    'wednesday': 'Çarşamba',
    'thursday': 'Perşembe',
    'friday': 'Cuma',
    'saturday': 'Cumartesi',
    'sunday': 'Pazar'
  };
  
  const lowerDay = day.toLowerCase();
  return dayTranslations[lowerDay] || day;
}

// Base64 şifreleme ve çözme fonksiyonları
export function encodeToBase64(data: unknown): string {
  try {
    const jsonString = JSON.stringify(data);
    return btoa(jsonString);
  } catch (error) {
    console.error('Base64 encoding error:', error);
    return '';
  }
}

export function decodeFromBase64<T>(encodedData: string): T | null {
  try {
    const decodedString = atob(encodedData);
    return JSON.parse(decodedString) as T;
  } catch (error) {
    console.error('Base64 decoding error:', error);
    return null;
  }
}

// Ödeme verisi için özel tip
export interface EncodedPaymentData {
  type: string;
  seans_id: number;
  ticket_count: number;
  [key: string]: unknown;
}

// Ödeme verisi şifreleme
export function encodePaymentData(data: EncodedPaymentData): string {
  return encodeToBase64(data);
}

// Ödeme verisi çözme
export function decodePaymentData(encodedData: string): EncodedPaymentData | null {
  return decodeFromBase64<EncodedPaymentData>(encodedData);
}
