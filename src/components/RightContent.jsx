import { HomeDefault } from "./HomeDefault";
import { AddMedia } from "./AddMedia";
import { UserProfile } from "./UserProfile";
import { Logout } from "./Logout";
import { MediaFullInfo } from "./MediaFullInfo";
import { SearchMediaResults } from "./SearchMediaResults";
import { useState } from "react";

export const RightContent = ({
  selectedMenuItem,
  userData,
  onMenuItemClick,
  setCurrentMediaDetails,
  currentMediaDetails,
  searchValue,
}) => {
  const [passAllMedia, setPassAllMedia] = useState([]);

  return (
    <div className="right-content">
      {selectedMenuItem === "home" && (
        <HomeDefault
          userData={userData}
          onMenuItemClick={onMenuItemClick}
          setCurrentMediaDetails={setCurrentMediaDetails}
          currentMediaDetails={currentMediaDetails}
          setPassAllMedia={setPassAllMedia}
        ></HomeDefault>
      )}
      {selectedMenuItem === "searchMediaResults" && (
        <SearchMediaResults
          searchValue={searchValue}
          passAllMedia={passAllMedia}
        ></SearchMediaResults>
      )}
      {selectedMenuItem === "addMedia" && (
        <AddMedia userData={userData}></AddMedia>
      )}
      {selectedMenuItem === "mediaFullInfo" && (
        <MediaFullInfo
          onMenuItemClick={onMenuItemClick}
          currentMediaDetails={currentMediaDetails}
          setCurrentMediaDetails={setCurrentMediaDetails}
        ></MediaFullInfo>
      )}
      {selectedMenuItem === "profile" && (
        <UserProfile userData={userData}></UserProfile>
      )}
      {selectedMenuItem === "logout" && <Logout></Logout>}
    </div>
  );
};
