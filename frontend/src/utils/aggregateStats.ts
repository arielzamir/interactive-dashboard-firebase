import { TrafficStat } from "../interfaces/TrafficStat.interface";

export const groupBy = (
  array: TrafficStat[],
  keyFn: (item: TrafficStat) => string
) => {
  return array.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, TrafficStat[]>);
};

export const aggregateVisits = (grouped: Record<string, TrafficStat[]>) => {
  return Object.entries(grouped).map(([period, stats]) => ({
    date: period,
    visits: stats.reduce((sum, s) => sum + s.visits, 0),
  }));
};
