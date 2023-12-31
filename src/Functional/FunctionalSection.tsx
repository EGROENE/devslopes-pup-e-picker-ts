// The purpose of this component is to "hardcode" the navbar, then dump whatever children into the rest.

import { Dispatch, ReactNode, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Tab } from "../types";

interface FunctionalSectionProps {
  favsTotal: number;
  unfavsTotal: number;
  isLoading: boolean;
  activeTab: Tab;
  setActiveTab: Dispatch<SetStateAction<Tab>>;
  children: ReactNode;
}

export const FunctionalSection = ({
  favsTotal,
  unfavsTotal,
  isLoading,
  activeTab,
  setActiveTab,
  children,
}: FunctionalSectionProps) => {
  return (
    <>
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>
          <Link to={"/class"} className="btn">
            Change to Class
          </Link>
          <div className="selectors">
            <button
              disabled={isLoading}
              className={activeTab === "fav-dogs" ? "selector active" : "selector"}
              onClick={() => {
                if (activeTab !== "fav-dogs") {
                  setActiveTab("fav-dogs");
                }
                if (activeTab === "fav-dogs") {
                  setActiveTab("all-dogs");
                }
              }}
            >
              favorited ( {favsTotal} )
            </button>
            <button
              disabled={isLoading}
              className={activeTab === "unfav-dogs" ? "selector active" : "selector"}
              onClick={() => {
                if (activeTab !== "unfav-dogs") {
                  setActiveTab("unfav-dogs");
                }
                if (activeTab === "unfav-dogs") {
                  setActiveTab("all-dogs");
                }
              }}
            >
              unfavorited ( {unfavsTotal} )
            </button>
            <button
              disabled={isLoading}
              className={activeTab === "create-dog" ? "selector active" : "selector"}
              onClick={() => {
                activeTab !== "create-dog"
                  ? setActiveTab("create-dog")
                  : setActiveTab("all-dogs");
              }}
            >
              create dog
            </button>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    </>
  );
};
