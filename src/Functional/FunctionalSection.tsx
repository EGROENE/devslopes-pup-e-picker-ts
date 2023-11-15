// you can use this type for react children if you so choose
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";

interface FunctionalSectionProps {
  allDogs: Dog[];
  setAllDogs: Dispatch<SetStateAction<Dog[]>>;
  dogsAreDisplayed: boolean;
  setDogsAreDisplayed: Dispatch<SetStateAction<boolean>>;
  favsAreDisplayed: boolean | null;
  setFavsAreDisplayed: Dispatch<SetStateAction<boolean | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const FunctionalSection = ({
  allDogs: allDogs,
  setAllDogs: setAllDogs,
  dogsAreDisplayed: dogsAreDisplayed,
  setDogsAreDisplayed: setDogsAreDisplayed,
  favsAreDisplayed: favsAreDisplayed,
  setFavsAreDisplayed: setFavsAreDisplayed,
  isLoading: isLoading,
  setIsLoading: setIsLoading,
}: FunctionalSectionProps) => {
  const favsTotal = allDogs.filter((dog) => dog.isFavorite).length;
  const unfavsTotal = allDogs.filter((dog) => !dog.isFavorite).length;

  const dataHasBeenFetched: boolean = allDogs.length > 0;

  return (
    <>
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
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
          <FunctionalDogs
            allDogs={allDogs}
            setAllDogs={setAllDogs}
            dogsAreDisplayed={dogsAreDisplayed}
            favsAreDisplayed={favsAreDisplayed}
            setFavsAreDisplayed={setFavsAreDisplayed}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <FunctionalCreateDogForm
            setAllDogs={setAllDogs}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </div>
    </>
  );
};
