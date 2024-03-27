import "./LeftMenu.css";

export const LeftMenu = ({ selectedMenuItem, onMenuItemClick }) => {
  return (
    <>
      <button
        className={selectedMenuItem === "home" ? "active" : ""}
        onClick={() => onMenuItemClick("home")}
      >
        Home
      </button>
      <button
        className={selectedMenuItem === "addMedia" ? "active" : ""}
        onClick={() => onMenuItemClick("addMedia")}
      >
        Add Media
      </button>
      <button
        className={selectedMenuItem === "profile" ? "active" : ""}
        onClick={() => onMenuItemClick("profile")}
      >
        Profile
      </button>
      <button
        className={selectedMenuItem === "logout" ? "active" : ""}
        onClick={() => onMenuItemClick("logout")}
      >
        Logout
      </button>
    </>
  );
};
