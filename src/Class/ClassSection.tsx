// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog } from "../types";

interface ClassSectionProps {
  allDogs: Dog[];
  setAllDogs: (newValue: Dog[]) => void;
  dogsAreDisplayed: boolean;
  setDogsAreDisplayed: (newValue: boolean) => void;
  favsAreDisplayed: boolean | null;
  setFavsAreDisplayed: (newValue: boolean | null) => void;
  isLoading: boolean;
  setIsLoading: (newValue: boolean) => void;
}

export class ClassSection extends Component<ClassSectionProps> {
  render() {
    const {
      allDogs,
      setAllDogs,
      dogsAreDisplayed,
      setDogsAreDisplayed,
      favsAreDisplayed,
      setFavsAreDisplayed,
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
                favsAreDisplayed && dogsAreDisplayed ? "selector active" : "selector"
              }
              onClick={() => {
                if (!dogsAreDisplayed || !favsAreDisplayed) {
                  setDogsAreDisplayed(true);
                }
                if (favsAreDisplayed && dogsAreDisplayed) {
                  setFavsAreDisplayed(null);
                }
                // if favsAreDisplayed is false or null...
                if (!favsAreDisplayed) {
                  setFavsAreDisplayed(true);
                }
              }}
            >
              favorited ( {favsTotal} )
            </button>

            <button
              disabled={!dataHasBeenFetched}
              className={
                favsAreDisplayed === false && dogsAreDisplayed
                  ? "selector active"
                  : "selector"
              }
              onClick={() => {
                if (!dogsAreDisplayed) {
                  setDogsAreDisplayed(true);
                }
                if (!favsAreDisplayed && dogsAreDisplayed) {
                  setFavsAreDisplayed(null);
                }
                if (favsAreDisplayed || favsAreDisplayed === null) {
                  setFavsAreDisplayed(false);
                }
              }}
            >
              unfavorited ( {unfavsTotal} )
            </button>
            <button
              disabled={!dataHasBeenFetched}
              className={!dogsAreDisplayed ? "selector active" : "selector"}
              onClick={() => {
                dogsAreDisplayed ? setDogsAreDisplayed(false) : setDogsAreDisplayed(true);
              }}
            >
              create dog
            </button>
          </div>
        </div>
        <div className="content-container">
          {dogsAreDisplayed ? (
            <ClassDogs
              allDogs={allDogs}
              setAllDogs={setAllDogs}
              dogsAreDisplayed={dogsAreDisplayed}
              favsAreDisplayed={favsAreDisplayed}
              setFavsAreDisplayed={setFavsAreDisplayed}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ) : (
            <ClassCreateDogForm
              setAllDogs={setAllDogs}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setDogsAreDisplayed={setDogsAreDisplayed}
            />
          )}
        </div>
      </>
    );
  }
}
