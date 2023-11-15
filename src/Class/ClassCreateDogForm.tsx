import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

const defaultSelectedImage = dogPictures.BlueHeeler;

interface ClassCreateDogFormState {
  newDogName: string;
  newDogImage: string;
  newDogDescription: string;
}

interface ClassCreateDogFormProps {
  createNewDog: (newDogCharacteristics: Omit<Dog, "id">, resetForm: () => void) => void;
  isLoading: boolean;
}

export class ClassCreateDogForm extends Component<
  ClassCreateDogFormProps,
  ClassCreateDogFormState
> {
  state = {
    newDogName: "",
    newDogImage: defaultSelectedImage,
    newDogDescription: "",
  };

  setNewDogName = (newValue: string) => {
    this.setState((prevState) => ({
      ...prevState,
      newDogName: newValue,
    }));
  };

  setNewDogImage = (newValue: string) => {
    this.setState((prevState) => ({
      ...prevState,
      newDogImage: newValue,
    }));
  };

  setNewDogDescription = (newValue: string) => {
    this.setState((prevState) => ({
      ...prevState,
      newDogDescription: newValue,
    }));
  };

  render() {
    const { isLoading, createNewDog } = this.props;

    const resetForm = (): void => {
      this.setNewDogName("");
      this.setNewDogDescription("");
      this.setNewDogImage(defaultSelectedImage);
    };

    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          createNewDog(
            {
              description: this.state.newDogDescription,
              image: this.state.newDogImage,
              name: this.state.newDogName,
            },
            resetForm
          );
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          required
          value={this.state.newDogName}
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
