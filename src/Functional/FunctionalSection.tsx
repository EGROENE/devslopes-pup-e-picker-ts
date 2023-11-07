// you can use this type for react children if you so choose
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export const FunctionalSection = () => {
  return (
    <div className="container-header">
      <div className="container-label">Dogs: </div>
      <Link to={"/class"} className="btn">
        Change to Class
      </Link>
      <div className="selectors">
        {/* This should display the favorited count */}
        <div className={`selector active`} onClick={() => {}}>
          favorited ( 12 )
        </div>

        {/* This should display the unfavorited count */}
        <div className={`selector`} onClick={() => {}}>
          unfavorited ( 25 )
        </div>
        <div className={`selector`} onClick={() => {}}>
          create dog
        </div>
      </div>
    </div>
  );
};
