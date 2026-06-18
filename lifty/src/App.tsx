import { useState, useEffect } from "react";
import "./App.css";
import { Lift } from "./Lift.tsx";

type WeekNumber = 1 | 2 | 3 | 4;
type DayType = "Deadlift & Shoulder Press" | "Squat & Bench";
type SetEntry = { weight: number; reps: number };
type LiftHistory = Record<
  string,
  {
    deadlift: Array<SetEntry>;
    squat: Array<SetEntry>;
    shoulder: Array<SetEntry>;
    bench: Array<SetEntry>;
  }
>;

type StoredLiftyData = {
  squatTM: number;
  deadliftTM: number;
  shoulderTM: number;
  benchTM: number;
  week: WeekNumber;
  cycle: number;
  liftHistory: LiftHistory;
};

function App() {
  const [deadliftTM, setDeadliftTM] = useState(0);
  const [shoulderTM, setShoulderTM] = useState(0);
  const [benchTM, setBenchTM] = useState(0);
  const [squatTM, setSquatTM] = useState(0);
  const [week, setWeek] = useState<WeekNumber>(1);
  const [dayType, setDayType] = useState<DayType>(undefined);

  useEffect(() => {
    const rawData = localStorage.getItem("liftyData");
    let parsedData: StoredLiftyData;
    try {
      parsedData = JSON.parse(rawData);
      setBenchTM(parsedData.benchTM);
      setDeadliftTM(parsedData.deadliftTM);
      setShoulderTM(parsedData.shoulderTM);
      setSquatTM(parsedData.squatTM);
      setWeek(parsedData.week);
    } catch (e) {}
  }, []);

  // useEffect(() => {
  //   const data: string = JSON.stringify({
  //     benchTM,
  //     shoulderTM,
  //     squatTM,
  //     deadliftTM,
  //     week,
  //   });
  //   localStorage.setItem("liftyData", data);
  // }, [benchTM, shoulderTM, squatTM, deadliftTM]);

  const title = "it's lifty! <3";
  return (
    <div>
      <h1 className="title">{title}</h1>
      <h3> it's a week {week}!</h3>
      {!dayType ? <DayTypePicker setDayType={setDayType} /> : null}
      {dayType === "Deadlift & Shoulder Press" ? (
        <DeadliftPressDay
          deadliftTM={deadliftTM}
          shoulderTM={shoulderTM}
          week={week}
          setDayType={setDayType}
        />
      ) : null}
      {dayType === "Squat & Bench" ? (
        <SquatBenchDay
          squatTM={squatTM}
          benchTM={benchTM}
          week={week}
          setDayType={setDayType}
        />
      ) : null}
    </div>
  );
}

export default App;

function DayTypePicker({ setDayType }) {
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

function SquatBenchDay({ squatTM, benchTM, week, setDayType }) {
  return (
    <div>
      <Lift liftName={"Squat"} tm={squatTM} week={week}></Lift>
      <Lift liftName={"Bench"} tm={benchTM} week={week}></Lift>
      <button onClick={() => setDayType("Deadlift & Shoulder Press")}>
        jk i want the other day!
      </button>
    </div>
  );
}

function DeadliftPressDay({ deadliftTM, shoulderTM, week, setDayType }) {
  return (
    <div>
      <Lift liftName={"Deadlift"} tm={deadliftTM} week={week}></Lift>
      <Lift liftName={"Shoulder Press"} tm={shoulderTM} week={week}></Lift>
      <button onClick={() => setDayType("Squat & Bench")}>
        jk i want the other day!
      </button>
    </div>
  );
}
