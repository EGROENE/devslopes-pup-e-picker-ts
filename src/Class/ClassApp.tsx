import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { Dog } from "../types";
import { getAllDogs, createDog } from "../Shared/Requests";
import toast from "react-hot-toast";

interface ClassAppState {
  allDogs: Dog[];
  dogsAreDisplayed: boolean;
  favsAreDisplayed: boolean | null;
  isLoading: boolean;
}

export class ClassApp extends Component {
  state: ClassAppState = {
    allDogs: [],
    dogsAreDisplayed: true,
    favsAreDisplayed: null,
    isLoading: false,
  };

  setAllDogs = (newValue: Dog[]): void => {
    this.setState((prevState) => ({
      ...prevState,
      allDogs: newValue,
    }));
  };

  setDogsAreDisplayed = (newValue: boolean): void => {
    this.setState((prevState) => ({
      ...prevState,
      dogsAreDisplayed: newValue,
    }));
  };

  setFavsAreDisplayed = (newValue: boolean | null): void => {
    this.setState((prevState) => ({
      ...prevState,
      favsAreDisplayed: newValue,
    }));
  };

  setIsLoading = (newValue: boolean): void => {
    this.setState((prevState) => ({
      ...prevState,
      isLoading: newValue,
    }));
  };

  componentDidMount(): void {
    getAllDogs().then((dogs) => {
      this.setAllDogs(dogs);
    });
  }

  createNewDog = (newDogCharacteristics: Omit<Dog, "id">, resetForm: () => void) => {
    createDog(newDogCharacteristics)
      .then(() => {
        this.setIsLoading(true);
        getAllDogs()
          .then(this.setAllDogs)
          .then(() => this.setIsLoading(false));
        toast.success(`${newDogCharacteristics.name} created!`);
        resetForm();
      })
      .catch(() => toast.error("Something went wrong. Please try again."));
  };

  render() {
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <section id="main-section">
          <ClassSection
            createNewDog={this.createNewDog}
            allDogs={this.state.allDogs}
            setAllDogs={this.setAllDogs}
            isLoading={this.state.isLoading}
            setIsLoading={this.setIsLoading}
          />
        </section>
      </div>
    );
  }
}
