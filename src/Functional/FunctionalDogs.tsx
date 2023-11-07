import { Dispatch, SetStateAction } from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

interface FunctionalDogsProps {
  allDogs: Dog[];
  dogsAreDisplayed: boolean;
  favsAreDisplayed: boolean | null;
  setFavsAreDisplayed: Dispatch<SetStateAction<boolean | null>>;
}

export const FunctionalDogs = ({
  allDogs: allDogs,
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
              alert("clicked trash");
            }}
            // onClick of heart, add to favorited (PATCH request made to update isFavorite to true)
            onHeartClick={() => {
              alert("clicked heart");
            }}
            // onClick of heart, add to unfavorited (PATCH request made to update isFavorite to false)
            onEmptyHeartClick={() => {
              alert("clicked empty heart");
            }}
            isLoading={false}
          />
        )
      )}
    </>
  );
};
