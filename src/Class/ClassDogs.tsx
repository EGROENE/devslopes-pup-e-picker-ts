import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog, Tab } from "../types";
import { getAllDogs, addToFavorites, removeFromFavorites } from "../Shared/Requests";

interface ClassDogsProps {
  removeDog: (dog: Dog) => Promise<string>;
  allDogs: Dog[];
  setAllDogs: (newValue: Dog[]) => void;
  activeTab: Tab;
  isLoading: boolean;
  setIsLoading: (newValue: boolean) => void;
}

export class ClassDogs extends Component<ClassDogsProps> {
  render() {
    const { allDogs, setAllDogs, activeTab, isLoading, setIsLoading, removeDog } =
      this.props;

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
  }
}
