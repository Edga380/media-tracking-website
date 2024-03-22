import { HomeDefault } from "./HomeDefault";
import { UserProfile } from "./UserProfile";
import { Logout } from "./Logout";

export const RightContent = ({ selectedMenuItem }) => {
  return (
    <div className="right-content">
      {selectedMenuItem === "home" && <HomeDefault></HomeDefault>}
      {selectedMenuItem === "profile" && <UserProfile></UserProfile>}
      {selectedMenuItem === "logout" && <Logout></Logout>}
    </div>
  );
};
