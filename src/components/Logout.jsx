import { UseAuth } from "../components/UseAuth";

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
  return <button onClick={handleLogout}>Logout</button>;
};
