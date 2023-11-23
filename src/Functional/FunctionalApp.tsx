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

  const [activeTab, setActiveTab] = useState<Tab>("all-dogs");

  useEffect(() => {
    getAllDogs()
      .then(setAllDogs)
      .finally(() => setIsLoading(false));
  }, []);

  const refetchDogs = (): Promise<void> => {
    return getAllDogs().then(setAllDogs);
  };

  // Method that is called onSubmit of CreateDogForm to create new dog based on user's input:
  // Define it here b/c it uses a few things from this component, reduces prop drilling
  const createNewDog = (newDogCharacteristics: Omit<Dog, "id">): Promise<void> => {
    return createDog(newDogCharacteristics)
      .then(refetchDogs)
      .then(() => {
        toast.success(`${newDogCharacteristics.name} created!`);
      })
      .finally(() => setIsLoading(false));
  };

  // Pass these as props to FunctionalSection:
  const favsTotal = allDogs.filter((dog) => dog.isFavorite).length;
  const unfavsTotal = allDogs.filter((dog) => !dog.isFavorite).length;

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      {/* Pass as props the things that correspond to the navbar, like counts & activeTab */}
      <FunctionalSection
        favsTotal={favsTotal}
        unfavsTotal={unfavsTotal}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLoading={isLoading}
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
