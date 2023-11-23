import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import toast from "react-hot-toast";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

interface FunctionalCreateDogFormProps {
  createNewDog: (newDogCharacteristics: Omit<Dog, "id">) => Promise<unknown>;
  isLoading: boolean;
}

export const FunctionalCreateDogForm = ({
  createNewDog,
  isLoading,
}: FunctionalCreateDogFormProps) => {
  const [newDogName, setNewDogName] = useState<string>("");
  const [newDogImage, setNewDogImage] = useState<string>(defaultSelectedImage);
  const [newDogDescription, setNewDogDescription] = useState<string>("");

  /* Defined here b/c it relies on state setters of this component. Things would be cluttered if these states were to be defined in FunctionalApp.jsx */
  const resetForm = (): void => {
    setNewDogName("");
    setNewDogDescription("");
    setNewDogImage(defaultSelectedImage);
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        createNewDog({
          description: newDogDescription,
          image: newDogImage,
          name: newDogName,
        })
          .then(() => resetForm())
          .catch(() => toast.error("Something went wrong. Please try again."));
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
      <input disabled={isLoading} type="submit" />
    </form>
  );
};
