import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Tab } from "../types";

interface ClassSectionState {
  activeTab: Tab;
}

interface ClassSectionProps {
  children: ReactNode;
  favsTotal: number;
  unfavsTotal: number;
  isLoading: boolean;
  activeTab: Tab;
  setActiveTab: (newValue: Tab) => void;
}

export class ClassSection extends Component<ClassSectionProps, ClassSectionState> {
  render() {
    const { children, isLoading, favsTotal, unfavsTotal, activeTab, setActiveTab } =
      this.props;

    return (
      <>
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            <button
              disabled={!isLoading}
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
              disabled={!isLoading}
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
              disabled={!isLoading}
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
      </>
    );
  }
}
