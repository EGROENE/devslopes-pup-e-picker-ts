import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { Dog } from "../types";
import { getAllDogs } from "../Shared/Requests";

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

  render() {
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <section id="main-section">
          <ClassSection
            allDogs={this.state.allDogs}
            setAllDogs={this.setAllDogs}
            dogsAreDisplayed={this.state.dogsAreDisplayed}
            setDogsAreDisplayed={this.setDogsAreDisplayed}
            favsAreDisplayed={this.state.favsAreDisplayed}
            setFavsAreDisplayed={this.setFavsAreDisplayed}
            isLoading={this.state.isLoading}
            setIsLoading={this.setIsLoading}
          />
        </section>
      </div>
    );
  }
}
