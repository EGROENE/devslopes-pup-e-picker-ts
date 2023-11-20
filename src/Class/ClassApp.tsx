import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog, Tab } from "../types";
import { getAllDogs, createDog } from "../Shared/Requests";
import toast from "react-hot-toast";

interface ClassAppState {
  allDogs: Dog[];
  dogsAreDisplayed: boolean;
  favsAreDisplayed: boolean | null;
  isLoading: boolean;
  activeTab: Tab;
}

export class ClassApp extends Component {
  state: ClassAppState = {
    allDogs: [],
    dogsAreDisplayed: true,
    favsAreDisplayed: null,
    isLoading: false,
    activeTab: "all-dogs",
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

  setActiveTab = (newValue: Tab): void => {
    this.setState((prevState) => ({
      ...prevState,
      activeTab: newValue,
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
    const favsTotal = this.state.allDogs.filter((dog) => dog.isFavorite).length;
    const unfavsTotal = this.state.allDogs.filter((dog) => !dog.isFavorite).length;

    const dataHasBeenFetched: boolean = this.state.allDogs.length > 0;

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <section id="main-section">
          {/* Pass as props the things that correspond to the navbar, like counts & activeTab */}
          <ClassSection
            favsTotal={favsTotal}
            unfavsTotal={unfavsTotal}
            dataHasBeenFetched={dataHasBeenFetched}
            activeTab={this.state.activeTab}
            setActiveTab={this.setActiveTab}
          >
            {/* Put logic to render parts of app in here */}
            {/* These are FunctionalSection's children */}
            {this.state.activeTab !== "create-dog" ? (
              <ClassDogs
                allDogs={this.state.allDogs}
                setAllDogs={this.setAllDogs}
                activeTab={this.state.activeTab}
                isLoading={this.state.isLoading}
                setIsLoading={this.setIsLoading}
              />
            ) : (
              <ClassCreateDogForm
                createNewDog={this.createNewDog}
                isLoading={this.state.isLoading}
              />
            )}
          </ClassSection>
        </section>
      </div>
    );
  }
}
