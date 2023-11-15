import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog, Tab } from "../types";
import {
  getAllDogs,
  deleteDog,
  addToFavorites,
  removeFromFavorites,
} from "../Shared/Requests";
import toast from "react-hot-toast";

interface ClassDogsProps {
  allDogs: Dog[];
  setAllDogs: (newValue: Dog[]) => void;
  activeTab: Tab;
  isLoading: boolean;
  setIsLoading: (newValue: boolean) => void;
}

export class ClassDogs extends Component<ClassDogsProps> {
  render() {
    const { allDogs, setAllDogs, activeTab, isLoading, setIsLoading } = this.props;

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
  }
}
