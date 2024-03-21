import { useEffect, useState } from "react";
import "./Login.css";
import { UseAuth } from "./UseAuth";

export default function Login() {
  const { login } = UseAuth();

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState({
    error: { color: "", message: "" },
  });
  const [formActive, setFormActive] = useState(true);
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });
  const [registrationFormData, setRegistrationFormData] = useState({
    chooseUsername: "",
    choosePassword: "",
    confirmPassword: "",
  });

  const toggleForms = () => {
    setFormActive(!formActive);

    setErrorMessage({
      error: {
        message: "",
        color: "",
      },
    });
  };

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleRegistrationInputChange = (event) => {
    const { name, value } = event.target;
    setRegistrationFormData({ ...registrationFormData, [name]: value });
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch("http://localhost:3000/check-login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          if (data) {
            await login(data.username);
            setLoading(false);
          }
          setLoading(false);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    checkLogin();
  }, []);

  const submitLoginForm = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginFormData),
      });
      if (response.ok) {
        await login(loginFormData.username);
        setLoginFormData({ ...loginFormData, username: "", password: "" });
        setLoading(false);
      } else {
        setErrorMessage({
          error: {
            message: "Username or Password incorrect.",
            color: "red",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitRegisterForm = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationFormData),
      });
      if (response.ok) {
        const data = await response.json();
        setRegistrationFormData({
          ...registrationFormData,
          chooseUsername: "",
          choosePassword: "",
          confirmPassword: "",
        });
        setErrorMessage({
          error: {
            message: data.message,
            color: "green",
          },
        });
      } else {
        const data = await response.json();
        setErrorMessage({
          error: {
            message: data.message,
            color: "red",
          },
        });
      }
    } catch {
      setErrorMessage({
        error: {
          message: "Server not responding.",
          color: "red",
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="page-loading-container">
        <div className="page-loading">
          <div className="page-loading-dot"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="sides-container">
        <div className="left-side">
          <div className="leftside-container">
            <h2>Welcome to your media tracker!</h2>
            <h4>Track your watched and to watch media here.</h4>
          </div>
        </div>
        <div className="right-side">
          <div className="form-container">
            {formActive && (
              <>
                <h2 className="form-header2">Login</h2>
                <h4 style={{ color: errorMessage.error.color }}>
                  {errorMessage.error.message}
                </h4>
                <form onSubmit={submitLoginForm}>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    minLength="4"
                    autoComplete="off"
                    pattern="[a-zA-Z0-9!$%&@]+"
                    title="Letters numbers and !,$,%,&,@ are allowed"
                    value={loginFormData.username}
                    onChange={handleLoginInputChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    minLength="8"
                    autoComplete="off"
                    pattern="[a-zA-Z0-9!$%&@]+"
                    title="Letters numbers and !,$,%,&,@ are allowed"
                    value={loginFormData.password}
                    onChange={handleLoginInputChange}
                    required
                  />
                  <button type="submit">Login</button>
                  <div>
                    <a onClick={toggleForms} className="text-link">
                      Register
                    </a>
                  </div>
                </form>
              </>
            )}
            {!formActive && (
              <>
                <h2 className="form-header2">Register</h2>
                <h4 style={{ color: errorMessage.error.color }}>
                  {errorMessage.error.message}
                </h4>
                <form onSubmit={submitRegisterForm}>
                  <input
                    type="text"
                    name="chooseUsername"
                    placeholder="Choose Username"
                    minLength="4"
                    autoComplete="off"
                    pattern="[a-zA-Z0-9!$%&@]+"
                    title="Letters numbers and !,$,%,&,@ are allowed"
                    value={registrationFormData.chooseUsername}
                    onChange={handleRegistrationInputChange}
                    required
                  />
                  <input
                    type="password"
                    name="choosePassword"
                    placeholder="Choose Password"
                    minLength="8"
                    autoComplete="off"
                    pattern="[a-zA-Z0-9!$%&@]+"
                    title="Letters numbers and !,$,%,&,@ are allowed"
                    value={registrationFormData.choosePassword}
                    onChange={handleRegistrationInputChange}
                    required
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    minLength="8"
                    autoComplete="off"
                    pattern="[a-zA-Z0-9!$%&@]+"
                    title="Letters numbers and !,$,%,&,@ are allowed"
                    value={registrationFormData.confirmPassword}
                    onChange={handleRegistrationInputChange}
                    required
                  />
                  <button type="submit">Register</button>
                  <div>
                    <a onClick={() => toggleForms()} className="text-link">
                      Login
                    </a>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
