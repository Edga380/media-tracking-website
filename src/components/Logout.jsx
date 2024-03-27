import { UseAuth } from "../components/UseAuth";
import "./Logout.css";

export const Logout = () => {
  const { logout } = UseAuth();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        logout();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="logout-container">
      <div className="section-name">LOGOUT</div>
      <div className="logout-section-container">
        <div className="logout-information">
          <h2>See you later!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};
