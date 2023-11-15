import { useState, useEffect } from "react";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";
import { getAllDogs, createDog } from "../Shared/Requests";
import toast from "react-hot-toast";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  useEffect(() => {
    getAllDogs().then(setAllDogs);
  }, []);

  const [dogsAreDisplayed, setDogsAreDisplayed] = useState<boolean>(true);

  const [favsAreDisplayed, setFavsAreDisplayed] = useState<boolean | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Method that is called onSubmit of CreateDogForm to create new dog based on user's input:
  // Define it here b/c it uses a few things from this component, reduces prop drilling
  const createNewDog = (
    newDogCharacteristics: Omit<Dog, "id">,
    resetForm: () => void
  ) => {
    createDog(newDogCharacteristics)
      .then(() => {
        setIsLoading(true);
        getAllDogs()
          .then(setAllDogs)
          .then(() => setIsLoading(false));
        toast.success(`${newDogCharacteristics.name} created!`);
        resetForm();
      })
      .catch(() => toast.error("Something went wrong. Please try again."));
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <section id="main-section">
        <FunctionalSection
          createNewDog={createNewDog}
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
