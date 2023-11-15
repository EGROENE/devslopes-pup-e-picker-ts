// you can use this type for react children if you so choose
import { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { Dog, Tab } from "../types";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";

interface FunctionalSectionProps {
  createNewDog: (newDogCharacteristics: Omit<Dog, "id">, resetForm: () => void) => void;
  allDogs: Dog[];
  setAllDogs: Dispatch<SetStateAction<Dog[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const FunctionalSection = ({
  createNewDog: createNewDog,
  allDogs: allDogs,
  setAllDogs: setAllDogs,
  isLoading: isLoading,
  setIsLoading: setIsLoading,
}: FunctionalSectionProps) => {
  const favsTotal = allDogs.filter((dog) => dog.isFavorite).length;
  const unfavsTotal = allDogs.filter((dog) => !dog.isFavorite).length;

  const dataHasBeenFetched: boolean = allDogs.length > 0;

  const [activeTab, setActiveTab] = useState<Tab>("all-dogs");

  return (
    <>
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          <button
            disabled={!dataHasBeenFetched}
            className={activeTab === "fav-dogs" ? "selector active" : "selector"}
            onClick={() => {
              if (activeTab !== "fav-dogs") {
                setActiveTab("fav-dogs");
              }
              if (activeTab === "fav-dogs") {
                setActiveTab("all-dogs");
              }
            }}
          >
            favorited ( {favsTotal} )
          </button>
          <button
            disabled={!dataHasBeenFetched}
            className={activeTab === "unfav-dogs" ? "selector active" : "selector"}
            onClick={() => {
              if (activeTab !== "unfav-dogs") {
                setActiveTab("unfav-dogs");
              }
              if (activeTab === "unfav-dogs") {
                setActiveTab("all-dogs");
              }
            }}
          >
            unfavorited ( {unfavsTotal} )
          </button>
          <button
            disabled={!dataHasBeenFetched}
            className={activeTab === "create-dog" ? "selector active" : "selector"}
            onClick={() => {
              activeTab !== "create-dog"
                ? setActiveTab("create-dog")
                : setActiveTab("all-dogs");
            }}
          >
            create dog
          </button>
        </div>
      </div>
      <div className="content-container">
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
      </div>
    </>
  );
};
