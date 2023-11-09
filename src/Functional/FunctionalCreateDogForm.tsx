import { useState, Dispatch, SetStateAction } from "react";
import { dogPictures } from "../dog-pictures";
import { createDog } from "../Shared/Requests";
import { Dog, newDogCharacteristics } from "../types";
import { getAllDogs } from "../Shared/Requests";
import toast from "react-hot-toast";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

interface FunctionalCreateDogFormProps {
  setAllDogs: Dispatch<SetStateAction<Dog[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setDogsAreDisplayed: Dispatch<React.SetStateAction<boolean>>;
}

export const FunctionalCreateDogForm = ({
  setAllDogs: setAllDogs,
  isLoading: isLoading,
  setIsLoading: setIsLoading,
  setDogsAreDisplayed: setDogsAreDisplayed,
}: FunctionalCreateDogFormProps) => {
  const [newDogName, setNewDogName] = useState<string>("");
  const [newDogImage, setNewDogImage] = useState<string>(defaultSelectedImage);
  const [newDogDescription, setNewDogDescription] = useState<string>("");

  const newDogCharacteristics: newDogCharacteristics = {
    newDogName: newDogName,
    newDogImage: newDogImage,
    newDogDescription: newDogDescription,
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
          )
          .then(() => setNewDogName(""))
          .then(() => setNewDogDescription(""))
          .then(() => setNewDogImage(defaultSelectedImage))
          .then(() => setDogsAreDisplayed(true))
          .then(() => toast.success("Dog created!"));
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        required
        value={newDogName}
        type="text"
        disabled={isLoading}
        onChange={(e) => setNewDogName(e.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        value={newDogDescription}
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={isLoading}
        onChange={(e) => setNewDogDescription(e.target.value)}
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
