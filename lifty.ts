type SetScheme = { percentage: number; reps: number; isAmrap: boolean };
type WorkoutLog = {
  cycle: number;
  week: WeekNumber;
  lift: Lift;
  sets: { reps: number }[];
};

type AppState = {
  currentCycle: number;
  currentWeek: WeekNumber;
  trainingMaxes: Record<Lift, number>;
  log: WorkoutLog[];
};
