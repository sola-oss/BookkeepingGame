import { defaultUserData, type UserData, type GameResult } from "@shared/schema";
import { isSameDay, parseISO, differenceInDays } from "date-fns";

const STORAGE_KEY = "boki_game_data";

export function loadUserData(): UserData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultUserData, ...parsed };
    }
  } catch (e) {
    console.error("Failed to load user data:", e);
  }
  return { ...defaultUserData };
}

export function saveUserData(data: UserData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save user data:", e);
  }
}

export function updateStreak(userData: UserData): UserData {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  
  if (!userData.lastPlayDate) {
    return { ...userData, streak: 1, lastPlayDate: todayStr };
  }
  
  const lastPlay = parseISO(userData.lastPlayDate);
  const daysDiff = differenceInDays(today, lastPlay);
  
  if (isSameDay(today, lastPlay)) {
    return userData;
  } else if (daysDiff === 1) {
    return { ...userData, streak: userData.streak + 1, lastPlayDate: todayStr };
  } else {
    return { ...userData, streak: 1, lastPlayDate: todayStr };
  }
}

export function addGameResult(userData: UserData, result: GameResult): UserData {
  const newWeak = { ...userData.weakAccounts };
  
  result.wrongAccounts.forEach((accountId) => {
    newWeak[accountId] = (newWeak[accountId] || 0) + 1;
  });
  
  const recentResults = [result, ...userData.recentResults].slice(0, 10);
  
  return {
    ...userData,
    totalGames: userData.totalGames + 1,
    totalCorrect: userData.totalCorrect + result.correctCount,
    totalWrong: userData.totalWrong + result.wrongCount,
    weakAccounts: newWeak,
    recentResults,
  };
}

export function getWeakAccounts(userData: UserData): { id: string; count: number }[] {
  return Object.entries(userData.weakAccounts)
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count);
}

export function getLastAccuracy(userData: UserData): number | null {
  if (userData.recentResults.length === 0) return null;
  return userData.recentResults[0].accuracy;
}

export function getLastScore(userData: UserData): number | null {
  if (userData.recentResults.length === 0) return null;
  return userData.recentResults[0].score;
}
