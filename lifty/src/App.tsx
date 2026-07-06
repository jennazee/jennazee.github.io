import { useState, useEffect } from "react";
import "./App.css";
import { Lift } from "./Lift.tsx";

type WeekNumber = 1 | 2 | 3 | 4;
type DayType = "Deadlift & Shoulder Press" | "Squat & Bench";
type SetDayTypeType = (d: DayType) => void;
type SetEntry = { weight: number; reps: number };
type LiftHistoryEntry = {
  timestamp: number;
  week: WeekNumber;
  cycle: number;
  lifts: { [K in LiftType]?: SetEntry[] };
};

type StoredLiftyData = {
  squatTM: number;
  deadliftTM: number;
  shoulderTM: number;
  benchTM: number;
  week: WeekNumber;
  cycle: number;
  liftHistory: LiftHistoryEntry[];
};

type SubmitButtonEventHander = (e: React.SubmitEvent<HTMLFormElement>) => void;

const lifts = ["deadlift", "squat", "bench", "shoulder"] as const;
type LiftType = (typeof lifts)[number];

function App() {
  const [deadliftTM, setDeadliftTM] = useState(0);
  const [shoulderTM, setShoulderTM] = useState(0);
  const [benchTM, setBenchTM] = useState(0);
  const [squatTM, setSquatTM] = useState(0);
  const [week, setWeek] = useState<WeekNumber>(1);
  const [cycle, setCycle] = useState<number>(1);
  const [dayType, setDayType] = useState<DayType>();
  const [liftHistory, setLiftHistory] = useState<LiftHistoryEntry[]>([]);

  useEffect(() => {
    const rawData = localStorage.getItem("liftyData");
    let parsedData: StoredLiftyData;
    if (!rawData) {
      return;
    }
    try {
      parsedData = JSON.parse(rawData);
      setBenchTM(parsedData.benchTM);
      setDeadliftTM(parsedData.deadliftTM);
      setShoulderTM(parsedData.shoulderTM);
      setSquatTM(parsedData.squatTM);
      setWeek(parsedData.week);
      setCycle(parsedData.cycle);
      setLiftHistory(parsedData.liftHistory || []);
    } catch (e) {}
  }, []);

  const setTms: SubmitButtonEventHander = (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const entries = Object.fromEntries(formData.entries());

    const calcDeadliftTM =
      typeof entries.deadlift1rm === "string"
        ? parseInt(entries.deadlift1rm) * 0.9
        : 0;
    const calcSquatTM =
      typeof entries.squat1rm === "string"
        ? parseInt(entries.squat1rm) * 0.9
        : 0;
    const calcBenchTM =
      typeof entries.bench1rm === "string"
        ? parseInt(entries.bench1rm) * 0.9
        : 0;
    const calcShoulderTM =
      typeof entries.shoulder1rm === "string"
        ? parseInt(entries.shoulder1rm) * 0.9
        : 0;
    setDeadliftTM(calcDeadliftTM);
    setSquatTM(calcSquatTM);
    setBenchTM(calcBenchTM);
    setShoulderTM(calcShoulderTM);

    const initialData = {
      benchTM: calcDeadliftTM,
      shoulderTM: calcShoulderTM,
      squatTM: calcSquatTM,
      deadliftTM: calcDeadliftTM,
      week: 1,
      cycle,
      liftHistory: [],
    };
    console.log(initialData);
    const data: string = JSON.stringify(initialData);
    localStorage.setItem("liftyData", data);
  };

  const addLift = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("addLift called");

    const form = e.target;
    const formData = new FormData(form);
    const entries = Array.from(formData.entries());
    let lifts: { [K in LiftType]?: SetEntry[] } = {};
    if (
      entries[0][0].split("-")[0] === "deadlift" ||
      entries[0][0].split("-")[0] === "shoulder"
    ) {
      lifts = { deadlift: [], shoulder: [] };
    } else {
      lifts = { squat: [], bench: [] };
    }
    const newLift: LiftHistoryEntry = {
      timestamp: Date.now(),
      week,
      cycle,
      lifts,
    };
    entries.forEach(([liftCode, reps]) => {
      const [lift, weight, index] = liftCode.split("-") as [
        LiftType,
        string,
        string,
      ];
      const weightNum = parseInt(weight);
      const repsNum = typeof reps === "string" ? parseInt(reps) : 0;
      const setEntry: SetEntry = { weight: weightNum, reps: repsNum };
      if (newLift.lifts[lift]) {
        newLift.lifts[lift][parseInt(index)] = setEntry;
      }
    });

    let newData: StoredLiftyData;
    // this presumes one lift day of each type, which is safe for me for now!
    if (week === 4 && liftHistory[liftHistory.length - 1].week === 4) {
      newData = {
        benchTM: benchTM + 5,
        shoulderTM: shoulderTM + 5,
        squatTM: squatTM + 10,
        deadliftTM: deadliftTM + 10,
        week: 1,
        cycle: cycle + 1,
        liftHistory: [...liftHistory, newLift],
      };
      const data: string = JSON.stringify(newData);
      localStorage.setItem("liftyData", data);
    } else if (
      week !== 4 &&
      liftHistory[liftHistory.length - 1] &&
      liftHistory[liftHistory.length - 1].week === week
    ) {
      newData = {
        benchTM,
        shoulderTM,
        squatTM,
        deadliftTM,
        week: (week + 1) as WeekNumber,
        cycle,
        liftHistory: [...liftHistory, newLift],
      };
      const data: string = JSON.stringify(newData);
      localStorage.setItem("liftyData", data);
    } else {
      newData = {
        benchTM,
        shoulderTM,
        squatTM,
        deadliftTM,
        week,
        cycle,
        liftHistory: [...liftHistory, newLift],
      };
    }
    const data: string = JSON.stringify(newData);
    console.log("setting", data);
    localStorage.setItem("liftyData", data);
  };

  const isMissingTM = !deadliftTM || !squatTM || !shoulderTM || !benchTM;

  const title = "it's lifty! <3";
  return (
    <div>
      <h1 className="title">{title}</h1>
      {isMissingTM ? (
        <WelcomeScreen setTms={setTms} />
      ) : (
        <>
          <h3> it's a week {week}!</h3>
          {!dayType ? <DayTypePicker setDayType={setDayType} /> : null}
          {dayType === "Deadlift & Shoulder Press" ? (
            <DeadliftPressDay
              deadliftTM={deadliftTM}
              shoulderTM={shoulderTM}
              week={week}
              setDayType={setDayType}
              addLift={addLift}
            />
          ) : null}
          {dayType === "Squat & Bench" ? (
            <SquatBenchDay
              squatTM={squatTM}
              benchTM={benchTM}
              week={week}
              setDayType={setDayType}
              addLift={addLift}
            />
          ) : null}
        </>
      )}
    </div>
  );
}

export default App;

function DayTypePicker({ setDayType }: { setDayType: SetDayTypeType }) {
  return (
    <div>
      <button onClick={() => setDayType("Squat & Bench")}>
        it's a squat & bench day!
      </button>
      <button onClick={() => setDayType("Deadlift & Shoulder Press")}>
        it's a deadlift & shoulder press day!
      </button>
    </div>
  );
}

type BaseDayProps = {
  week: WeekNumber;
  setDayType: SetDayTypeType;
  addLift: SubmitButtonEventHander;
};

type SquatBenchDayProps = BaseDayProps & {
  squatTM: number;
  benchTM: number;
};

type DeadliftPressDayProps = BaseDayProps & {
  deadliftTM: number;
  shoulderTM: number;
};

function SquatBenchDay({
  squatTM,
  benchTM,
  week,
  setDayType,
  addLift,
}: SquatBenchDayProps) {
  return (
    <form onSubmit={addLift}>
      <Lift liftName={"squat"} tm={squatTM} week={week}></Lift>
      <Lift liftName={"bench"} tm={benchTM} week={week}></Lift>
      <button type="submit">i'm done!</button>
      <button onClick={() => setDayType("Deadlift & Shoulder Press")}>
        jk i want the other day!
      </button>
    </form>
  );
}

function DeadliftPressDay({
  deadliftTM,
  shoulderTM,
  week,
  setDayType,
  addLift,
}: DeadliftPressDayProps) {
  return (
    <form onSubmit={addLift}>
      <Lift liftName={"deadlift"} tm={deadliftTM} week={week}></Lift>
      <Lift liftName={"shoulder"} tm={shoulderTM} week={week}></Lift>
      <button type="submit">i'm done!</button>
      <button onClick={() => setDayType("Squat & Bench")}>
        jk i want the other day!
      </button>
    </form>
  );
}

type WelcomeScreenProps = {
  setTms: SubmitButtonEventHander;
};
function WelcomeScreen({ setTms }: WelcomeScreenProps) {
  return (
    <form onSubmit={setTms}>
      <h3>oh hey! let's get your 1 rep maxes!</h3>
      <ul>
        {lifts.map((lift) => {
          return (
            <li>
              <label htmlFor={`${lift}1rm`} className="oneRmLabel">
                {lift === "shoulder" ? "shoulder press" : lift}
              </label>
              <input
                className="repInput"
                id={`${lift}1rm`}
                name={`${lift}1rm`}
                type="number"
              ></input>
            </li>
          );
        })}
      </ul>
      <button type="submit">go!</button>
    </form>
  );
}
