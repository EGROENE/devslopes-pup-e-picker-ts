// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog, Tab } from "../types";
import { ClassMainContent } from "./ClassMainContent";

interface ClassSectionState {
  activeTab: Tab;
}

interface ClassSectionProps {
  children: ReactNode;
  createNewDog: (newDogCharacteristics: Omit<Dog, "id">, resetForm: () => void) => void;
  allDogs: Dog[];
  setAllDogs: (newValue: Dog[]) => void;
  isLoading: boolean;
  setIsLoading: (newValue: boolean) => void;
}

export class ClassSection extends Component<ClassSectionProps, ClassSectionState> {
  state = {
    activeTab: "all-dogs" as Tab,
  };

  setActiveTab = (newValue: Tab) => {
    this.setState((prevState) => ({
      ...prevState,
      activeTab: newValue,
    }));
  };

  render() {
    const {
      children,
      createNewDog: createNewDog,
      allDogs,
      setAllDogs,
      isLoading,
      setIsLoading,
    } = this.props;

    const favsTotal = allDogs.filter((dog) => dog.isFavorite).length;
    const unfavsTotal = allDogs.filter((dog) => !dog.isFavorite).length;

    const dataHasBeenFetched: boolean = allDogs.length > 0;

    return (
      <>
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            <button
              disabled={!dataHasBeenFetched}
              className={
                this.state.activeTab === "fav-dogs" ? "selector active" : "selector"
              }
              onClick={() => {
                if (this.state.activeTab !== "fav-dogs") {
                  this.setActiveTab("fav-dogs");
                }
                if (this.state.activeTab === "fav-dogs") {
                  this.setActiveTab("all-dogs");
                }
              }}
            >
              favorited ( {favsTotal} )
            </button>

            <button
              disabled={!dataHasBeenFetched}
              className={
                this.state.activeTab === "unfav-dogs" ? "selector active" : "selector"
              }
              onClick={() => {
                if (this.state.activeTab !== "unfav-dogs") {
                  this.setActiveTab("unfav-dogs");
                }
                if (this.state.activeTab === "unfav-dogs") {
                  this.setActiveTab("all-dogs");
                }
              }}
            >
              unfavorited ( {unfavsTotal} )
            </button>
            <button
              disabled={!dataHasBeenFetched}
              className={
                this.state.activeTab === "create-dog" ? "selector active" : "selector"
              }
              onClick={() => {
                this.state.activeTab !== "create-dog"
                  ? this.setActiveTab("create-dog")
                  : this.setActiveTab("all-dogs");
              }}
            >
              create dog
            </button>
          </div>
        </div>
        <div className="content-container">
          <ClassMainContent
            activeTab={this.state.activeTab}
            allDogs={allDogs}
            setAllDogs={setAllDogs}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            createNewDog={createNewDog}
          >
            {children}
          </ClassMainContent>
        </div>
      </>
    );
  }
}
