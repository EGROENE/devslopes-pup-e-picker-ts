import { Component, ReactNode } from "react";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog, Tab } from "../types";

interface ClassMainContentProps {
  children: ReactNode;
  activeTab: Tab;
  allDogs: Dog[];
  setAllDogs: (newValue: Dog[]) => void;
  isLoading: boolean;
  setIsLoading: (newValue: boolean) => void;
  createNewDog: (newDogCharacteristics: Omit<Dog, "id">, resetForm: () => void) => void;
}

export class ClassMainContent extends Component<ClassMainContentProps> {
  render() {
    const { activeTab, allDogs, setAllDogs, isLoading, setIsLoading, createNewDog } =
      this.props;

    return (
      <>
        {activeTab !== "create-dog" ? (
          <ClassDogs
            allDogs={allDogs}
            setAllDogs={setAllDogs}
            activeTab={activeTab}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <ClassCreateDogForm createNewDog={createNewDog} isLoading={isLoading} />
        )}
      </>
    );
  }
}
