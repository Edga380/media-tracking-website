import { HomeDefault } from "./HomeDefault";
import { AddMedia } from "./AddMedia";
import { UserProfile } from "./UserProfile";
import { Logout } from "./Logout";
import { MediaFullInfo } from "./MediaFullInfo";

export const RightContent = ({
  selectedMenuItem,
  userData,
  onMenuItemClick,
  setCurrentMediaDetails,
  currentMediaDetails,
}) => {
  return (
    <div className="right-content">
      {selectedMenuItem === "home" && (
        <HomeDefault
          userData={userData}
          onMenuItemClick={onMenuItemClick}
          setCurrentMediaDetails={setCurrentMediaDetails}
          currentMediaDetails={currentMediaDetails}
        ></HomeDefault>
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
