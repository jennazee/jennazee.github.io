// Week 1: 3 sets at 65%, 75%, 85% of Training Max (TM)
// Week 2: 3 sets at 70%, 80%, 90% of TM
// Week 3: 3 sets at 75%, 85%, 95% of TM
// Week 4 (deload): 3 sets at 40%, 50%, 60% of TM
const weightProgressions = [
  [
    [0.65, 5],
    [0.75, 5],
    [0.85, Infinity],
  ],
  [
    [0.7, 3],
    [0.8, 3],
    [0.9, Infinity],
  ],
  [
    [0.75, 5],
    [0.85, 3],
    [0.95, Infinity],
  ],
  [
    [0.4, 5],
    [0.5, 5],
    [0.6, 5],
  ],
];

type WeekNumber = 1 | 2 | 3 | 4;

function calculateWeights(week: WeekNumber, tm: number) {
  return weightProgressions[week - 1].map(([percent, reps]) => {
    const rawPercentage = percent * tm;
    return { weight: Math.round(rawPercentage / 5) * 5, reps };
  });
}

const possiblePlates = [45, 35, 25, 10, 5, 2.5];

function plateMath(weight: number) {
  const bar = weight >= 55 ? 45 : 15;
  const plateStack = [];

  let remainingWeight = (weight - bar) / 2;
  while (remainingWeight > 0) {
    for (let i = 0; i < possiblePlates.length; i++) {
      if (remainingWeight >= possiblePlates[i]) {
        plateStack.push(possiblePlates[i]);
        remainingWeight -= possiblePlates[i];
        break;
      }
    }
    continue;
  }
  return { bar, plates: plateStack };
}
type LiftProps = {
  week: WeekNumber;
  liftName: string;
  tm: number;
};
export function Lift({ week, liftName, tm }: LiftProps) {
  let weights: Array<{ weight: number; reps: number }> = calculateWeights(
    week,
    tm,
  );
  if (liftName === "squat" || liftName === "deadlift") {
    weights = [
      ...weights,
      weights[0],
      weights[0],
      weights[0],
      weights[0],
      weights[0],
    ];
  }
  const liftNameForTitle =
    liftName === "shoulder" ? "shoulder press" : liftName;
  return (
    <div className="LiftBox">
      <h2>{liftNameForTitle}</h2>
      <ol>
        {weights.map(({ weight, reps }, index) => (
          <li>
            <span className="weight">{weight}</span>
            <span className="plateMaths">
              (Bar: {plateMath(weight).bar} | Plates:{" "}
              {plateMath(weight).plates.join(" + ")})
            </span>
            <div>
              <input
                id={`${liftName.toLowerCase()}-${weight}-${index}`}
                name={`${liftName}-${weight}-${index}`}
                className="repInput"
                placeholder={reps === Infinity ? "🚀" : reps.toString()}
                type="number"
              />
              <label htmlFor={`${liftName}-${weight}-${index}`}> reps</label>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
