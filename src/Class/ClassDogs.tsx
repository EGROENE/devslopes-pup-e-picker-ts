import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";
import {
  getAllDogs,
  deleteDog,
  addToFavorites,
  removeFromFavorites,
} from "../Shared/Requests";

interface ClassDogsProps {
  allDogs: Dog[];
  setAllDogs: (newValue: Dog[]) => void;
  dogsAreDisplayed: boolean;
  favsAreDisplayed: boolean | null;
  setFavsAreDisplayed: (newValue: boolean | null) => void;
  isLoading: boolean;
  setIsLoading: (newValue: boolean) => void;
}

export class ClassDogs extends Component<ClassDogsProps> {
  render() {
    const {
      allDogs,
      setAllDogs,
      dogsAreDisplayed,
      favsAreDisplayed,
      isLoading,
      setIsLoading,
    } = this.props;

    let displayedDogs = allDogs;
    if (dogsAreDisplayed && favsAreDisplayed) {
      displayedDogs = allDogs.filter((dog) => dog.isFavorite);
    } else if (dogsAreDisplayed && favsAreDisplayed === false) {
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
            onTrashIconClick={() => {
              deleteDog(String(dog.id))
                .then(() => setIsLoading(true))
                .then(() =>
                  getAllDogs()
                    .then(setAllDogs)
                    .then(() => setIsLoading(false))
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
  }
}
