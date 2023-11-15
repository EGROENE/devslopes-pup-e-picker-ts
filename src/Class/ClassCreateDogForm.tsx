import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog, newDogCharacteristics } from "../types";
import { createDog } from "../Shared/Requests";
import { getAllDogs } from "../Shared/Requests";
import toast from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

interface ClassCreateDogFormState {
  newDogCharacteristics: newDogCharacteristics;
}

interface ClassCreateDogFormProps {
  setAllDogs: (newValue: Dog[]) => void;
  isLoading: boolean;
  setIsLoading: (newValue: boolean) => void;
  setDogsAreDisplayed: (newValue: boolean) => void;
}

export class ClassCreateDogForm extends Component<
  ClassCreateDogFormProps,
  ClassCreateDogFormState
> {
  state = {
    newDogCharacteristics: {
      newDogName: "",
      newDogImage: defaultSelectedImage,
      newDogDescription: "",
      isFavorite: false,
      id: 0,
    },
  };

  setNewDogName = (newValue: string) => {
    this.setState((prevState) => ({
      newDogCharacteristics: {
        ...prevState.newDogCharacteristics,
        newDogName: newValue,
      },
    }));
  };

  setNewDogImage = (newValue: string) => {
    this.setState((prevState) => ({
      newDogCharacteristics: {
        ...prevState.newDogCharacteristics,
        newDogImage: newValue,
      },
    }));
  };

  setNewDogDescription = (newValue: string) => {
    this.setState((prevState) => ({
      newDogCharacteristics: {
        ...prevState.newDogCharacteristics,
        newDogDescription: newValue,
      },
    }));
  };

  render() {
    const { setAllDogs, isLoading, setIsLoading, setDogsAreDisplayed } = this.props;

    const resetForm = (): void => {
      this.setNewDogName("");
      this.setNewDogDescription("");
      this.setNewDogImage(defaultSelectedImage);
      setDogsAreDisplayed(true);
    };

    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          createDog(this.state.newDogCharacteristics)
            .then(() => setIsLoading(true))
            .then(() =>
              getAllDogs()
                .then(setAllDogs)
                .then(() => setIsLoading(false))
            )
            .then(() => resetForm())
            .then(() => toast.success("Dog added!"));
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          required
          value={this.state.newDogCharacteristics.newDogName}
          type="text"
          onChange={(e) => this.setNewDogName(e.target.value)}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          onChange={(e) => this.setNewDogDescription(e.target.value)}
          disabled={isLoading}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          onChange={(e) => this.setNewDogImage(e.target.value)}
          disabled={isLoading}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    );
  }
}
