import { DogCard } from "../Shared/DogCard";
import { Dog, Tab } from "../types";

interface FunctionalDogsProps {
  removeDog: (dog: Dog) => Promise<string>;
  allDogs: Dog[];
  activeTab: Tab;
  isLoading: boolean;
  removeFromFavoritesAction: (dog: Dog) => Promise<void>;
  addToFavoritesAction: (dog: Dog) => Promise<void>;
}

export const FunctionalDogs = ({
  removeDog,
  allDogs,
  activeTab,
  isLoading,
  removeFromFavoritesAction,
  addToFavoritesAction,
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
          onHeartClick={() => removeFromFavoritesAction(dog)}
          onEmptyHeartClick={() => addToFavoritesAction(dog)}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
