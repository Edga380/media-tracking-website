import { useState } from "react";
import "./MediaFullInfo.css";

export const MediaFullInfo = ({
  currentMediaDetails,
  setCurrentMediaDetails,
  onMenuItemClick,
}) => {
  const [editMedia, setEditMedia] = useState(false);

  const handleActivateEdit = () => {
    setEditMedia(!editMedia);
  };

  const [responseMsg, setResponseMsg] = useState({
    color: "rgb(240, 240, 240)",
    message: editMedia === true ? "Edit mode active." : "",
  });

  const handleOnchangeMediaValues = (event) => {
    const { name, value } = event.target;
    setCurrentMediaDetails({ ...currentMediaDetails, [name]: value });
  };

  const handleEditMediaSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/editMedia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentMediaDetails }),
    });
    if (response.ok) {
      setResponseMsg({
        ...responseMsg,
        color: "green",
        message: "Media edited successfully.",
      });
    } else {
      setResponseMsg({
        ...responseMsg,
        color: "red",
        message: "Failed to edit media.",
      });
    }
  };

  const handleWatchedChange = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/editMediaWatched", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentMediaDetails }),
    });
    if (response.ok) {
      const data = await response.json();
      setCurrentMediaDetails({ ...currentMediaDetails, watched: data });
    } else {
    }
  };

  const handleRemoveMedia = async () => {
    const response = await fetch("http://localhost:3000/removeMedia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentMediaDetails }),
    });
    if (response.ok) {
      setResponseMsg({
        ...responseMsg,
        color: "green",
        message: "Media deleted successfully.",
      });
      setTimeout(() => {
        onMenuItemClick("home");
      }, 1000);
    } else {
      setResponseMsg({
        ...responseMsg,
        color: "red",
        message: "Failed to delete media.",
      });
    }
  };

  return (
    <div className="media-full-info-container">
      <div className="media-full-info-name">{currentMediaDetails.name}</div>
      <div className="media-full-info-details-container">
        <div className="media-full-details-image">
          <img src={currentMediaDetails.image_url} />
        </div>
        <div className="media-full-details-container">
          {!editMedia ? (
            <>
              <h4
                style={{ color: responseMsg.color }}
                className="edit-media-mesage"
              >
                {responseMsg.message}
              </h4>
              <p>{currentMediaDetails.description}</p>
              <p>Category: {currentMediaDetails.category}</p>
              <p>Duration: {currentMediaDetails.duration}min.</p>
              <p>Genre: {currentMediaDetails.genre}</p>
              <p>Release year: {currentMediaDetails.year}</p>
              <p>
                Watched:{" "}
                {currentMediaDetails.watched === 0 ? "Not yet" : "Watched"}
              </p>
            </>
          ) : (
            <form onSubmit={handleEditMediaSubmit}>
              <h4
                style={{ color: responseMsg.color }}
                className="edit-media-mesage"
              >
                {responseMsg.message}
              </h4>
              <input
                className="edit-media-input-field-image"
                type="text"
                placeholder="Image url"
                name="image_url"
                value={currentMediaDetails.image_url}
                onChange={handleOnchangeMediaValues}
                required
              />
              <input
                className="edit-media-input-field-name"
                type="text"
                placeholder="Name"
                name="name"
                value={currentMediaDetails.name}
                onChange={handleOnchangeMediaValues}
                required
              />
              <textarea
                className="text-area"
                type="text"
                placeholder="Description"
                name="description"
                value={currentMediaDetails.description}
                onChange={handleOnchangeMediaValues}
                required
              />
              <select
                className="edit-media-input-field-category"
                id="media-category"
                name="category"
                value={currentMediaDetails.category}
                onChange={handleOnchangeMediaValues}
                required
              >
                <option value="other">Category: Other</option>
                <option value="animeSeries">Anime series</option>
                <option value="animeMovies">Anime movies</option>
                <option value="movies">Movies</option>
                <option value="tvSeries">Tv series</option>
              </select>
              <select
                className="edit-media-input-field-genre"
                id="media-genre"
                name="genre"
                value={currentMediaDetails.genre}
                onChange={handleOnchangeMediaValues}
                required
              >
                <option value="other">Genre: Other</option>
                <option value="action">Action</option>
                <option value="adventure">Adventure</option>
                <option value="animation">Animation</option>
                <option value="biography">Biography</option>
                <option value="comedy">Comedy</option>
                <option value="crime">Crime</option>
                <option value="cultMovie">Cult movie</option>
                <option value="disney">Disney</option>
                <option value="documentary">Documentary</option>
                <option value="drama">Drama</option>
                <option value="family">Family</option>
                <option value="fantasy">Fantasy</option>
                <option value="gangster">Gangster</option>
                <option value="history">History</option>
                <option value="horror">Horror</option>
                <option value="military">Military</option>
                <option value="music">Music</option>
                <option value="musical">Musical</option>
                <option value="mystery">Mystery</option>
                <option value="nature">Nature</option>
                <option value="period">Period</option>
                <option value="pixar">Pixar</option>
                <option value="romance">Romance</option>
                <option value="scifi">Sci-fi</option>
                <option value="spy">Spy</option>
                <option value="thriller">Thriller</option>
                <option value="war">War</option>
              </select>
              <input
                className="edit-media-input-field-year"
                type="number"
                placeholder="Year"
                name="year"
                value={currentMediaDetails.year}
                onChange={handleOnchangeMediaValues}
                min={1900}
                max={2099}
                minLength={4}
                maxLength={4}
                required
              />
              <input
                className="edit-media-input-field-duration"
                type="number"
                placeholder="Duration"
                name="duration"
                value={currentMediaDetails.duration}
                onChange={handleOnchangeMediaValues}
                min={0}
                max={999}
                minLength={3}
                maxLength={3}
                required
              />
              <div className="edit-media-input-field-buttons">
                <button type="submit" className="edit-media-input-field-button">
                  Submit
                </button>
                <button
                  className="edit-media-input-field-button"
                  onClick={handleActivateEdit}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          <div>
            <button
              className="margin-right-medium"
              onClick={handleActivateEdit}
            >
              Edit
            </button>
            <button
              className="margin-right-medium"
              onClick={handleWatchedChange}
            >
              {currentMediaDetails.watched === 0 ? "Watched" : "Watch"}
            </button>
            <button onClick={handleRemoveMedia} className="margin-right-medium">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
