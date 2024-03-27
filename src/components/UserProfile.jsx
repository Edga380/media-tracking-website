import "./UserProfile.css";

export const UserProfile = ({ userData }) => {
  return (
    <div className="profile-container">
      <div className="section-name">PROFILE</div>
      <div className="profile-section-container">
        <div className="profile-information">
          <h2>{userData.username}</h2>
          <h3>Joined: {userData.joinedIn}</h3>
        </div>
      </div>
    </div>
  );
};
