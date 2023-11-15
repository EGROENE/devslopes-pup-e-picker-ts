import { Dispatch, SetStateAction } from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import {
  deleteDog,
  getAllDogs,
  addToFavorites,
  removeFromFavorites,
} from "../Shared/Requests";
import toast from "react-hot-toast";

interface FunctionalDogsProps {
  allDogs: Dog[];
  setAllDogs: Dispatch<SetStateAction<Dog[]>>;
  dogsAreDisplayed: boolean;
  favsAreDisplayed: boolean | null;
  setFavsAreDisplayed: Dispatch<SetStateAction<boolean | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const FunctionalDogs = ({
  allDogs: allDogs,
  setAllDogs: setAllDogs,
  dogsAreDisplayed: dogsAreDisplayed,
  favsAreDisplayed: favsAreDisplayed,
  isLoading: isLoading,
  setIsLoading: setIsLoading,
}: FunctionalDogsProps) => {
  // Set value of displayedDogs (used to populate page w/ dog cards):
  let displayedDogs: Dog[];
  if (dogsAreDisplayed && favsAreDisplayed) {
    displayedDogs = allDogs.filter((dog) => dog.isFavorite);
  } else if (dogsAreDisplayed && favsAreDisplayed === false) {
    displayedDogs = displayedDogs = allDogs.filter((dog) => !dog.isFavorite);
  } else {
    displayedDogs = allDogs;
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
          onTrashIconClick={() => {
            deleteDog(String(dog.id))
              .then(() => setIsLoading(true))
              .then(() =>
                getAllDogs()
                  .then(setAllDogs)
                  .then(() => setIsLoading(false))
                  .then(() => toast.error(`${dog.name} removed`))
              );
          }}
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
