import "./Home.css";
import { LeftMenu } from "../components/LeftMenu";
import { RightContent } from "../components/RightContent";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentMediaDetails, setCurrentMediaDetails] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState("home");
  const [searchValue, setSearchValue] = useState("");

  const [userData, setUserData] = useState({
    username: "",
    userId: -1,
    joinedIn: -1,
  });

  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/getuserdata", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUserData({
            ...userData,
            username: data.username,
            userId: data.user_id,
            joinedIn: data.joined_in,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    retrieveUserData();
  }, []);

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const handleOnChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <>
      <div className="home-container">
        <div className="left-side-container">
          <div className="username-container">
            <h2>{userData.username}</h2>
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
              value={searchValue}
              onChange={handleOnChangeSearchValue}
            />
            <button
              className="search-button"
              onClick={() => handleMenuItemClick("searchMediaResults")}
            >
              Search
            </button>
          </div>
          <RightContent
            currentMediaDetails={currentMediaDetails}
            setCurrentMediaDetails={setCurrentMediaDetails}
            selectedMenuItem={selectedMenuItem}
            onMenuItemClick={handleMenuItemClick}
            userData={userData}
            searchValue={searchValue}
          ></RightContent>
        </div>
      </div>
    </>
  );
}
