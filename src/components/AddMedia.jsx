import { useState } from "react";
import "./AddMedia.css";

export const AddMedia = ({ userData }) => {
  const [mediaFormData, setMediaFormData] = useState({
    imgUrl: "",
    name: "",
    description: "",
    category: "other",
    genre: "other",
    year: "",
    duration: "",
  });

  const [responseMsg, setResponseMsg] = useState({
    color: "rgb(240, 240, 240)",
    message: "All fields required.",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMediaFormData({ ...mediaFormData, [name]: value });
  };

  const handleAddMediaSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/addmedia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userData: userData.userId,
        mediaFormData: mediaFormData,
      }),
    });
    if (response.ok) {
      setResponseMsg({
        ...responseMsg,
        color: "green",
        message: "Media added successfully.",
      });
    } else {
      setResponseMsg({
        ...responseMsg,
        color: "red",
        message: "Failed to add media.",
      });
    }
  };

  return (
    <div className="addMedia-container">
      <div className="section-name">ADD MEDIA</div>
      <div className="addMedia-section-container">
        <form onSubmit={handleAddMediaSubmit}>
          <h4 style={{ color: responseMsg.color }}>{responseMsg.message}</h4>
          <input
            className="input-field"
            type="text"
            placeholder="Image url"
            name="imgUrl"
            value={mediaFormData.imgUrl}
            onChange={handleInputChange}
            required
          />
          <input
            className="input-field"
            type="text"
            placeholder="Name"
            name="name"
            value={mediaFormData.name}
            onChange={handleInputChange}
            required
          />
          <textarea
            className="text-area"
            type="text"
            placeholder="Description"
            name="description"
            value={mediaFormData.description}
            onChange={handleInputChange}
            required
          />
          <select
            className="select-field"
            id="media-category"
            name="category"
            value={mediaFormData.category}
            onChange={handleInputChange}
            required
          >
            <option value="other">Category: Other</option>
            <option value="animeSeries">Anime series</option>
            <option value="animeMovies">Anime movies</option>
            <option value="movies">Movies</option>
            <option value="tvSeries">Tv series</option>
          </select>
          <select
            className="select-field"
            id="media-genre"
            name="genre"
            value={mediaFormData.genre}
            onChange={handleInputChange}
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
            className="input-field"
            type="number"
            placeholder="Year"
            name="year"
            value={mediaFormData.year}
            onChange={handleInputChange}
            min={1900}
            max={2099}
            minLength={4}
            maxLength={4}
            required
          />
          <input
            className="input-field"
            type="number"
            placeholder="Duration"
            name="duration"
            value={mediaFormData.duration}
            onChange={handleInputChange}
            min={0}
            max={999}
            minLength={3}
            maxLength={3}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
