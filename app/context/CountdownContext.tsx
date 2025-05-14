"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react";

// Helper: Map day names to numbers
const dayNameToNumber = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6
};

// Helper: Parse draw time string (e.g., "10:59 PM ET") and return { hours, minutes, tz }
function parseDrawTime(
  drawTime: string
): { hour: number; minute: number; tz: string } | null {
  const match = drawTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*([A-Z]+)/);
  if (!match) return null;
  let [, hourStr, minuteStr, ampm, tz] = match;
  let hour = Number(hourStr);
  let minute = Number(minuteStr);
  if (ampm === "PM" && hour !== 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;
  return { hour, minute, tz };
}

// Helper: Convert a Date in the user's local time to ET (Eastern Time, UTC-4)
function toEasternTime(date: Date): Date {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const offset = -4; // hours (EDT)
  return new Date(utc + 3600000 * offset);
}

// Helper: Get the next draw Date object for a game
function getNextDrawDate(drawDays: string[], drawTime: string): Date | null {
  const now = toEasternTime(new Date());
  const parsed = parseDrawTime(drawTime);
  if (!parsed) return null;
  const { hour, minute } = parsed;
  const today = now.getDay();
  let minDiff = 8;
  let nextDayNum = today;
  for (const day of drawDays) {
    const dayNum = dayNameToNumber[day as keyof typeof dayNameToNumber];
    let diff = (dayNum - today + 7) % 7;
    if (diff === 0) {
      const drawDate = new Date(now);
      drawDate.setHours(hour, minute, 0, 0);
      if (drawDate.getTime() > now.getTime()) {
        minDiff = 0;
        nextDayNum = dayNum;
        break;
      } else {
        diff = 7;
      }
    }
    if (diff < minDiff) {
      minDiff = diff;
      nextDayNum = dayNum;
    }
  }
  const nextDraw = new Date(now);
  nextDraw.setDate(now.getDate() + minDiff);
  nextDraw.setHours(hour, minute, 0, 0);
  return nextDraw;
}

// List of games to track (id, drawDays, drawTime)
const games = [
  {
    id: "powerball",
    drawDays: ["Monday", "Wednesday", "Saturday"],
    drawTime: "10:59 PM ET"
  },
  {
    id: "megaMillions",
    drawDays: ["Tuesday", "Friday"],
    drawTime: "11:00 PM ET"
  },
  { id: "pick3midday", drawDays: ["Daily"], drawTime: "12:59 PM ET" },
  { id: "pick3evening", drawDays: ["Daily"], drawTime: "10:57 PM ET" },
  { id: "pick4midday", drawDays: ["Daily"], drawTime: "12:59 PM ET" },
  { id: "pick4evening", drawDays: ["Daily"], drawTime: "10:57 PM ET" },
  { id: "jerseyCash5", drawDays: ["Daily"], drawTime: "10:57 PM ET" },
  { id: "cash4Life", drawDays: ["Daily"], drawTime: "9:00 PM ET" }
];

function normalizeDrawDays(drawDays: string[]): string[] {
  if (drawDays.length === 1 && drawDays[0] === "Daily") {
    return [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  }
  return drawDays;
}

export type CountdownMap = Record<
  string,
  { hours: number; minutes: number; seconds: number }
>;

const CountdownContext = createContext<{
  countdowns: CountdownMap;
  countdownsReady: boolean;
}>({ countdowns: {}, countdownsReady: false });

export function CountdownProvider({ children }: { children: ReactNode }) {
  const [countdowns, setCountdowns] = useState<CountdownMap>({});
  const [countdownsReady, setCountdownsReady] = useState(false);

  useEffect(() => {
    function updateCountdowns() {
      setCountdowns(prev => {
        const updated: CountdownMap = { ...prev };
        games.forEach(game => {
          const nextDrawDate = getNextDrawDate(
            normalizeDrawDays(game.drawDays),
            game.drawTime
          );
          if (!nextDrawDate) return;
          const nowET = toEasternTime(new Date());
          let diff = Math.max(
            0,
            Math.floor((nextDrawDate.getTime() - nowET.getTime()) / 1000)
          );
          const hours = Math.floor(diff / 3600);
          diff %= 3600;
          const minutes = Math.floor(diff / 60);
          const seconds = diff % 60;
          updated[game.id] = { hours, minutes, seconds };
        });
        return updated;
      });
      setCountdownsReady(true);
    }
    updateCountdowns();
    const timer = setInterval(updateCountdowns, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <CountdownContext.Provider value={{ countdowns, countdownsReady }}>
      {children}
    </CountdownContext.Provider>
  );
}

export function useCountdowns() {
  return useContext(CountdownContext);
}
