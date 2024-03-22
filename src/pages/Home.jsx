import "./Home.css";
import { LeftMenu } from "../components/LeftMenu";
import { RightContent } from "../components/RightContent";
import { useState } from "react";

export default function Home() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("home");

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };
  return (
    <>
      <div className="home-container">
        <div className="left-side-container">
          <div className="avatar-container">
            <img src="./default_avatar.svg" alt="Avatar" />
          </div>
          <div className="username-container">
            <h2>Username</h2>
          </div>
          <div className="user-menu-container">
            <LeftMenu
              selectedMenuItem={selectedMenuItem}
              onMenuItemClick={handleMenuItemClick}
            ></LeftMenu>
          </div>
        </div>
        <div className="right-side-container">
          <div className="search-container">
            <input
              className="search-input"
              type="text"
              placeholder="Search..."
            />
            <button className="search-button">Search</button>
          </div>
          <RightContent selectedMenuItem={selectedMenuItem}></RightContent>
        </div>
      </div>
    </>
  );
}
