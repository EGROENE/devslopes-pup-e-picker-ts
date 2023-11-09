import { useState, useEffect } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";
import { getAllDogs } from "../Shared/Requests";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  useEffect(() => {
    getAllDogs().then(setAllDogs);
  }, []);

  // State to determine if (favs/unfavs) or 'create dog' displays:
  // Pass setter to FunctionalSection. There, call on click of 'favs', 'unfavs', & 'create dog' btns
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
          dogsAreDisplayed={dogsAreDisplayed}
          setDogsAreDisplayed={setDogsAreDisplayed}
          favsAreDisplayed={favsAreDisplayed}
          setFavsAreDisplayed={setFavsAreDisplayed}
        />
        <div className="content-container">
          {dogsAreDisplayed ? (
            <FunctionalDogs
              allDogs={allDogs}
              setAllDogs={setAllDogs}
              dogsAreDisplayed={dogsAreDisplayed}
              favsAreDisplayed={favsAreDisplayed}
              setFavsAreDisplayed={setFavsAreDisplayed}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ) : (
            <FunctionalCreateDogForm
              setAllDogs={setAllDogs}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setDogsAreDisplayed={setDogsAreDisplayed}
            />
          )}
        </div>
      </section>
    </div>
  );
}
