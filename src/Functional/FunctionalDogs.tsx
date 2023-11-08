import { Dispatch, SetStateAction, useState } from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import {
  deleteDog,
  getAllDogs,
  addToFavorites,
  removeFromFavorites,
} from "../Shared/Requests";

interface FunctionalDogsProps {
  allDogs: Dog[];
  setAllDogs: Dispatch<SetStateAction<Dog[]>>;
  dogsAreDisplayed: boolean;
  favsAreDisplayed: boolean | null;
  setFavsAreDisplayed: Dispatch<SetStateAction<boolean | null>>;
}

export const FunctionalDogs = ({
  allDogs: allDogs,
  setAllDogs: setAllDogs,
  dogsAreDisplayed: dogsAreDisplayed,
  favsAreDisplayed: favsAreDisplayed,
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

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      {displayedDogs.map(
        (dog: {
          id: string;
          image: string;
          description: string;
          isFavorite: boolean;
          name: string;
        }) => (
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
              deleteDog(Number(dog.id))
                .then(() => setIsLoading(true))
                .then(() =>
                  getAllDogs()
                    .then(setAllDogs)
                    .then(() => setIsLoading(false))
                );
            }}
            // onClick of heart, add to favorited (PATCH request made to update isFavorite to true)
            onHeartClick={() => {
              removeFromFavorites(Number(dog.id))
                .then(() => setIsLoading(true))
                .then(() =>
                  getAllDogs()
                    .then(setAllDogs)
                    .then(() => setIsLoading(false))
                );
            }}
            // onClick of heart, add to unfavorited (PATCH request made to update isFavorite to false)
            onEmptyHeartClick={() => {
              addToFavorites(Number(dog.id))
                .then(() => setIsLoading(true))
                .then(() =>
                  getAllDogs()
                    .then(setAllDogs)
                    .then(() => setIsLoading(false))
                );
            }}
            isLoading={isLoading}
          />
        )
      )}
    </>
  );
};
