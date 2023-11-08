import { useState, Dispatch, SetStateAction } from "react";
import { dogPictures } from "../dog-pictures";
import { createDog } from "../Shared/Requests";
import { Dog } from "../types";
import { getAllDogs } from "../Shared/Requests";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

interface FunctionalCreateDogFormProps {
  setAllDogs: Dispatch<SetStateAction<Dog[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const FunctionalCreateDogForm = ({
  setAllDogs: setAllDogs,
  setIsLoading: setIsLoading,
}: FunctionalCreateDogFormProps) => {
  const [newDogName, setNewDogName] = useState<string>("");
  const [newDogImage, setNewDogImage] = useState<string>("");
  const [newDogDescription, setNewDogDescription] = useState<string>("");

  const newDogCharacteristics: Dog = {
    name: newDogName,
    image: newDogImage,
    description: newDogDescription,
    isFavorite: false,
    id: 0,
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        createDog(newDogCharacteristics)
          .then(() => setIsLoading(true))
          .then(() =>
            getAllDogs()
              .then(setAllDogs)
              .then(() => setIsLoading(false))
          );
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={false}
        onChange={(e) => setNewDogName(e.target.value.trim())}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={false}
        onChange={(e) => setNewDogDescription(e.target.value.trim())}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select id="" onChange={(e) => setNewDogImage(e.target.value)}>
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" />
    </form>
  );
};
