import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog, Tab } from "../types";

interface ClassDogsProps {
  deleteDogAction: (dog: Dog) => Promise<string>;
  allDogs: Dog[];
  activeTab: Tab;
  isLoading: boolean;
  removeFromFavoritesAction: (dog: Dog) => Promise<void>;
  addToFavoritesAction: (dog: Dog) => Promise<void>;
}

export class ClassDogs extends Component<ClassDogsProps> {
  render() {
    const {
      allDogs,
      activeTab,
      isLoading,
      deleteDogAction,
      removeFromFavoritesAction,
      addToFavoritesAction,
    } = this.props;

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
            onTrashIconClick={() => deleteDogAction(dog)}
            onHeartClick={() => removeFromFavoritesAction(dog)}
            onEmptyHeartClick={() => addToFavoritesAction(dog)}
            isLoading={isLoading}
          />
        ))}
      </>
    );
  }
}
