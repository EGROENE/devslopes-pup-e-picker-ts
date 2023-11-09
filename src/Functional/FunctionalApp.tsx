import { useState, useEffect } from "react";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";
import { getAllDogs } from "../Shared/Requests";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  useEffect(() => {
    getAllDogs().then(setAllDogs);
  }, []);

  const [dogsAreDisplayed, setDogsAreDisplayed] = useState<boolean>(true);

  const [favsAreDisplayed, setFavsAreDisplayed] = useState<boolean | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <section id="main-section">
        <FunctionalSection
          allDogs={allDogs}
          setAllDogs={setAllDogs}
          dogsAreDisplayed={dogsAreDisplayed}
          setDogsAreDisplayed={setDogsAreDisplayed}
          favsAreDisplayed={favsAreDisplayed}
          setFavsAreDisplayed={setFavsAreDisplayed}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </section>
    </div>
  );
}
