import { useEffect, useState } from "react";
import { DogCard } from "../Shared/DogCard";
import { getAllDogs } from "../Shared/Requests";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = () => {
  const [allDogs, setAllDogs] = useState([]);

  useEffect(() => {
    getAllDogs().then(setAllDogs);
  }, []);

  return (
    <>
      {allDogs.map(
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
            onTrashIconClick={() => {
              alert("clicked trash");
            }}
            onHeartClick={() => {
              alert("clicked heart");
            }}
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
