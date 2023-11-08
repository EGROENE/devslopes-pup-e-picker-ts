// you can use this type for react children if you so choose
import { ReactNode, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";

interface FunctionalSectionProps {
  allDogs: Dog[];
  dogsAreDisplayed: boolean;
  setDogsAreDisplayed: Dispatch<SetStateAction<boolean>>;
  // favsAreDisplayed will be needed when making a uniform onClick function for navbar items
  favsAreDisplayed: boolean | null;
  setFavsAreDisplayed: Dispatch<SetStateAction<boolean | null>>;
}

export const FunctionalSection = ({
  allDogs: allDogs,
  dogsAreDisplayed: dogsAreDisplayed,
  setDogsAreDisplayed: setDogsAreDisplayed,
  favsAreDisplayed: favsAreDisplayed,
  setFavsAreDisplayed: setFavsAreDisplayed,
}: FunctionalSectionProps) => {
  const favsTotal = allDogs.filter((dog) => dog.isFavorite).length;
  const unfavsTotal = allDogs.filter((dog) => !dog.isFavorite).length;

  return (
    <div className="container-header">
      <div className="container-label">Dogs: </div>
      <Link to={"/class"} className="btn">
        Change to Class
      </Link>
      <div className="selectors">
        <div
          className={
            favsAreDisplayed && dogsAreDisplayed
              ? "selector active"
              : "selector"
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
        </div>
        <div
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
        </div>
        <div
          className={!dogsAreDisplayed ? "selector active" : "selector"}
          onClick={() => {
            dogsAreDisplayed
              ? setDogsAreDisplayed(false)
              : setDogsAreDisplayed(true);
          }}
        >
          create dog
        </div>
      </div>
    </div>
  );
};
