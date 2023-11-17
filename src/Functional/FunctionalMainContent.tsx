import { Dispatch, SetStateAction, ReactNode } from "react";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { Dog, Tab } from "../types";

export const FunctionalMainContent = ({
  activeTab,
  allDogs,
  setAllDogs,
  isLoading,
  setIsLoading,
  createNewDog,
}: {
  children: ReactNode;
  activeTab: Tab;
  allDogs: Dog[];
  setAllDogs: Dispatch<SetStateAction<Dog[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  createNewDog: (newDogCharacteristics: Omit<Dog, "id">, resetForm: () => void) => void;
}) => {
  return (
    <>
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
    </>
  );
};
