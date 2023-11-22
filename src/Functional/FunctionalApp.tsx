import { useState, useEffect } from "react";
import { FunctionalSection } from "./FunctionalSection";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { Dog, Tab } from "../types";
import { getAllDogs, createDog } from "../Shared/Requests";
import toast from "react-hot-toast";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllDogs()
      .then(setAllDogs)
      .finally(() => setIsLoading(false));
  }, []);

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

  // Pass these as props to FunctionalSection:
  const favsTotal = allDogs.filter((dog) => dog.isFavorite).length;
  const unfavsTotal = allDogs.filter((dog) => !dog.isFavorite).length;

  const dataHasBeenFetched: boolean = allDogs.length > 0;

  const [activeTab, setActiveTab] = useState<Tab>("all-dogs");

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      {/* Pass as props the things that correspond to the navbar, like counts & activeTab */}
      <FunctionalSection
        favsTotal={favsTotal}
        unfavsTotal={unfavsTotal}
        dataHasBeenFetched={dataHasBeenFetched}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {/* Put logic to render parts of app in here */}
        {/* These are FunctionalSection's children */}
        {activeTab !== "create-dog" ? (
          <FunctionalDogs
            allDogs={allDogs}
            setAllDogs={setAllDogs}
            activeTab={activeTab}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <FunctionalCreateDogForm createNewDog={createNewDog} isLoading={isLoading} />
        )}
      </FunctionalSection>
    </div>
  );
}
