import { useEffect, useState } from 'react';

import { nowTimeKey, toDateKey } from '@/core/dates';
import type { DateKey, TimeKey } from '@/core/types';

export type Now = { date: DateKey; time: TimeKey; hour: number };

const read = (): Now => {
  const d = new Date();
  return { date: toDateKey(d), time: nowTimeKey(d), hour: d.getHours() };
};

/** Current local date/time, refreshed every minute so overdue states stay honest. */
export function useToday(): Now {
  const [now, setNow] = useState(read);
  useEffect(() => {
    const id = setInterval(() => setNow(read()), 60_000);
    return () => clearInterval(id);
  }, []);
  return now;
}
