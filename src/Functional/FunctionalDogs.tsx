import { Dispatch, SetStateAction } from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog, Tab } from "../types";
import { getAllDogs, addToFavorites, removeFromFavorites } from "../Shared/Requests";

interface FunctionalDogsProps {
  removeDog: (dog: Dog) => Promise<string>;
  allDogs: Dog[];
  setAllDogs: Dispatch<SetStateAction<Dog[]>>;
  activeTab: Tab;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const FunctionalDogs = ({
  removeDog,
  allDogs,
  setAllDogs,
  activeTab,
  isLoading,
  setIsLoading,
}: FunctionalDogsProps) => {
  // Set value of displayedDogs (used to populate page w/ dog cards):
  let displayedDogs: Dog[] = allDogs;
  if (activeTab === "fav-dogs") {
    displayedDogs = allDogs.filter((dog) => dog.isFavorite);
  }
  if (activeTab === "unfav-dogs") {
    displayedDogs = displayedDogs = allDogs.filter((dog) => !dog.isFavorite);
  }

  return (
    <>
      {displayedDogs.map((dog: Dog) => (
        <DogCard
          dog={{
            id: dog.id,
            image: dog.image,
            description: dog.description,
            isFavorite: dog.isFavorite,
            name: dog.name,
          }}
          key={dog.id}
          onTrashIconClick={() => removeDog(dog)}
          onHeartClick={() => {
            removeFromFavorites(dog.id)
              .then(() => setIsLoading(true))
              .then(() =>
                getAllDogs()
                  .then(setAllDogs)
                  .then(() => setIsLoading(false))
              );
          }}
          onEmptyHeartClick={() => {
            addToFavorites(dog.id)
              .then(() => setIsLoading(true))
              .then(() =>
                getAllDogs()
                  .then(setAllDogs)
                  .then(() => setIsLoading(false))
              );
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
