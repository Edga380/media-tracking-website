import "./UserProfile.css";

export const UserProfile = () => {
  return (
    <div className="profile-container">
      <div className="section-name">PROFILE</div>
      <div className="profile-section-container">
        <div className="profile-bg">
          <div className="profile-information-container">
            <div className="profile-avatar-container">
              <img
                className="profile-avatar"
                src="./public/default_avatar.svg"
                alt=""
              />
              <button className="change-profile-avatar-button">S</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
