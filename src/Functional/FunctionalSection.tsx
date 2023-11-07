// you can use this type for react children if you so choose
import { ReactNode, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";

interface FunctionalSectionProps {
  allDogs: Dog[];
  setDogsAreDisplayed: Dispatch<SetStateAction<boolean>>;
}

export const FunctionalSection = ({
  allDogs: allDogs,
  setDogsAreDisplayed: setDogsAreDisplayed,
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
        <div className={`selector active`} onClick={() => {}}>
          favorited ( {favsTotal} )
        </div>
        <div className={`selector`} onClick={() => {}}>
          unfavorited ( {unfavsTotal} )
        </div>
        <div className={`selector`} onClick={() => {}}>
          create dog
        </div>
      </div>
    </div>
  );
};
