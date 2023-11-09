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
          // onClick of trash, dog is deleted from 'dogs' array in db.json
          onTrashIconClick={() => {
            deleteDog(String(dog.id))
              .then(() => setIsLoading(true))
              .then(() =>
                getAllDogs()
                  .then(setAllDogs)
                  .then(() => setIsLoading(false))
                  .then(() => toast.error("Dog removed"))
              );
          }}
          // onClick of heart, add to favorited (PATCH request made to update isFavorite to true)
          onHeartClick={() => {
            removeFromFavorites(dog.id)
              .then(() => setIsLoading(true))
              .then(() =>
                getAllDogs()
                  .then(setAllDogs)
                  .then(() => setIsLoading(false))
                  .then(() => toast.error("Dog removed from favorites"))
              );
          }}
          // onClick of heart, add to unfavorited (PATCH request made to update isFavorite to false)
          onEmptyHeartClick={() => {
            addToFavorites(dog.id)
              .then(() => setIsLoading(true))
              .then(() =>
                getAllDogs()
                  .then(setAllDogs)
                  .then(() => setIsLoading(false))
                  .then(() => toast.success("Dog added to favorites"))
              );
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
