import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog, Tab } from "../types";
import {
  getAllDogs,
  createDog,
  deleteDog,
  removeFromFavorites,
  addToFavorites,
} from "../Shared/Requests";
import toast from "react-hot-toast";

interface ClassAppState {
  allDogs: Dog[];
  isLoading: boolean;
  activeTab: Tab;
}

export class ClassApp extends Component {
  state: ClassAppState = {
    allDogs: [],
    isLoading: true,
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
    getAllDogs()
      .then((dogs) => {
        this.setAllDogs(dogs);
      })
      .finally(() => this.setIsLoading(false));
  }

  refetchDogs = (): Promise<void> => {
    return getAllDogs().then(this.setAllDogs);
  };

  deleteDogAction = (dog: Dog): Promise<string> => {
    this.setIsLoading(true);
    return deleteDog(dog.id).then(() =>
      getAllDogs()
        .then(this.refetchDogs)
        .then(() => toast.error(`${dog.name} removed`))
        .finally(() => this.setIsLoading(false))
    );
  };

  removeFromFavoritesAction = (dog: Dog): Promise<void> => {
    this.setIsLoading(true);
    return removeFromFavorites(dog.id).then(() =>
      getAllDogs()
        .then(this.setAllDogs)
        .then(() => this.setIsLoading(false))
    );
  };

  addToFavoritesAction = (dog: Dog): Promise<void> => {
    this.setIsLoading(true);
    return addToFavorites(dog.id).then(() =>
      getAllDogs()
        .then(this.setAllDogs)
        .then(() => this.setIsLoading(false))
    );
  };

  createNewDog = (newDogCharacteristics: Omit<Dog, "id">): Promise<void> => {
    return createDog(newDogCharacteristics)
      .then(this.refetchDogs)
      .then(() => {
        toast.success(`${newDogCharacteristics.name} created!`);
      })
      .finally(() => this.setIsLoading(false));
  };

  render() {
    const favsTotal = this.state.allDogs.filter((dog) => dog.isFavorite).length;
    const unfavsTotal = this.state.allDogs.filter((dog) => !dog.isFavorite).length;

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
            isLoading={this.state.isLoading}
            activeTab={this.state.activeTab}
            setActiveTab={this.setActiveTab}
          >
            {/* Put logic to render parts of app in here */}
            {/* These are ClassSection's children */}
            {this.state.activeTab !== "create-dog" ? (
              <ClassDogs
                deleteDogAction={this.deleteDogAction}
                allDogs={this.state.allDogs}
                activeTab={this.state.activeTab}
                isLoading={this.state.isLoading}
                removeFromFavoritesAction={this.removeFromFavoritesAction}
                addToFavoritesAction={this.addToFavoritesAction}
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
