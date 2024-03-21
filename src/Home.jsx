import "./Home.css";
import { UseAuth } from "./UseAuth";

function Home() {
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
    <>
      <div className="home-container">
        <div className="left-side-container">
          <div className="avatar-container">
            <img src="./default_avatar.svg" alt="Avatar" />
          </div>
          <div className="username-container">
            <h2>Username</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className="right-side-container">
          <div className="search-container">
            <input
              className="search-input"
              type="text"
              placeholder="Search..."
            />
            <button className="search-button">Search</button>
          </div>
          <div className="to-watch-container">
            <div className="section-name">TO WATCH</div>
            <div className="section-cards-container">
              <div className="media-card">
                <img
                  className="media-card-img"
                  src="https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTlhZGQtNzE3NzA4MWM0ODYzXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_.jpg"
                  alt=""
                />
                <div className="media-card-name">Demon Slayer</div>
                <div className="media-card-year">2018</div>
                <div className="media-card-rating">9.7/10</div>
              </div>
              <div className="media-card">
                <img
                  className="media-card-img"
                  src="https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTlhZGQtNzE3NzA4MWM0ODYzXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_.jpg"
                  alt=""
                />
                <div className="media-card-name">Demon Slayer</div>
                <div className="media-card-year">2018</div>
                <div className="media-card-rating">9.7/10</div>
              </div>
              <div className="media-card">
                <img
                  className="media-card-img"
                  src="https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTlhZGQtNzE3NzA4MWM0ODYzXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_.jpg"
                  alt=""
                />
                <div className="media-card-name">Demon Slayer</div>
                <div className="media-card-year">2018</div>
                <div className="media-card-rating">9.7/10</div>
              </div>
              <div className="media-card">
                <img
                  className="media-card-img"
                  src="https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTlhZGQtNzE3NzA4MWM0ODYzXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_.jpg"
                  alt=""
                />
                <div className="media-card-name">Demon Slayer</div>
                <div className="media-card-year">2018</div>
                <div className="media-card-rating">9.7/10</div>
              </div>
              <div className="media-card">
                <img
                  className="media-card-img"
                  src="https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTlhZGQtNzE3NzA4MWM0ODYzXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_.jpg"
                  alt=""
                />
                <div className="media-card-name">Demon Slayer</div>
                <div className="media-card-year">2018</div>
                <div className="media-card-rating">9.7/10</div>
              </div>
              <div className="media-card">
                <img
                  className="media-card-img"
                  src="https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTlhZGQtNzE3NzA4MWM0ODYzXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_.jpg"
                  alt=""
                />
                <div className="media-card-name">Demon Slayer</div>
                <div className="media-card-year">2018</div>
                <div className="media-card-rating">9.7/10</div>
              </div>
            </div>
          </div>
          <div className="to-watch-container">
            <div className="section-name">WATCHED</div>
            <div className="section-cards-container">
              <div className="media-card">
                <img
                  className="media-card-img"
                  src="https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTlhZGQtNzE3NzA4MWM0ODYzXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_.jpg"
                  alt=""
                />
                <div className="media-card-name">Demon Slayer</div>
                <div className="media-card-year">2018</div>
                <div className="media-card-rating">9.7/10</div>
              </div>
              <div className="media-card">
                <img
                  className="media-card-img"
                  src="https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTlhZGQtNzE3NzA4MWM0ODYzXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_.jpg"
                  alt=""
                />
                <div className="media-card-name">Demon Slayer</div>
                <div className="media-card-year">2018</div>
                <div className="media-card-rating">9.7/10</div>
              </div>
              <div className="media-card">
                <img
                  className="media-card-img"
                  src="https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTlhZGQtNzE3NzA4MWM0ODYzXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_.jpg"
                  alt=""
                />
                <div className="media-card-name">Demon Slayer</div>
                <div className="media-card-year">2018</div>
                <div className="media-card-rating">9.7/10</div>
              </div>
              <div className="media-card">
                <img
                  className="media-card-img"
                  src="https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTlhZGQtNzE3NzA4MWM0ODYzXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_.jpg"
                  alt=""
                />
                <div className="media-card-name">Demon Slayer</div>
                <div className="media-card-year">2018</div>
                <div className="media-card-rating">9.7/10</div>
              </div>
              <div className="media-card">
                <img
                  className="media-card-img"
                  src="https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTlhZGQtNzE3NzA4MWM0ODYzXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_.jpg"
                  alt=""
                />
                <div className="media-card-name">Demon Slayer</div>
                <div className="media-card-year">2018</div>
                <div className="media-card-rating">9.7/10</div>
              </div>
              <div className="media-card">
                <img
                  className="media-card-img"
                  src="https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTlhZGQtNzE3NzA4MWM0ODYzXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_.jpg"
                  alt=""
                />
                <div className="media-card-name">Demon Slayer</div>
                <div className="media-card-year">2018</div>
                <div className="media-card-rating">9.7/10</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
