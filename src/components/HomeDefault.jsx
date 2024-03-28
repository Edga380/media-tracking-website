import { useEffect, useState } from "react";
import "./HomeDefault.css";

export const HomeDefault = ({
  userData,
  onMenuItemClick,
  setCurrentMediaDetails,
  setPassAllMedia,
}) => {
  const [allMedia, setAllMedia] = useState([]);

  useEffect(() => {
    const retrieveMedia = async () => {
      const response = await fetch("http://localhost:3000/retrieveMedia", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ userData: userData.userId }),
      });
      if (response.ok) {
        const data = await response.json();
        setAllMedia(data);
        setPassAllMedia(data);
      }
    };
    if (userData.userId > 0) retrieveMedia();
  }, [userData]);

  const handleMediaNameClick = (index) => {
    onMenuItemClick("mediaFullInfo");
    setCurrentMediaDetails(allMedia[index]);
  };

  return (
    <>
      <div className="to-watch-container">
        <div className="section-name">TO WATCH</div>
        <div className="section-cards-container">
          {allMedia.length > 0 ? (
            allMedia
              .filter((media) => !media.watched)
              .map((media, index) => (
                <div key={index} className="media-card">
                  <img className="media-card-img" src={media.image_url} />
                  <div
                    onClick={() =>
                      handleMediaNameClick(allMedia.indexOf(media))
                    }
                    className="media-card-name"
                  >
                    {media.name}
                  </div>
                  <div className="media-card-year">{media.genre}</div>
                  <div className="media-card-year">{media.year}</div>
                </div>
              ))
          ) : (
            <h2>No media</h2>
          )}
        </div>
      </div>
      <div className="to-watch-container">
        <div className="section-name">WATCHED</div>
        <div className="section-cards-container">
          {allMedia.length > 0 &&
          allMedia.filter((media) => media.watched).length > 0 ? (
            allMedia
              .filter((media) => media.watched)
              .map((media, index) => (
                <div key={index} className="media-card">
                  <img className="media-card-img" src={media.image_url} />
                  <div
                    onClick={() =>
                      handleMediaNameClick(allMedia.indexOf(media))
                    }
                    className="media-card-name"
                  >
                    {media.name}
                  </div>
                  <div className="media-card-year">{media.genre}</div>
                  <div className="media-card-year">{media.year}</div>
                </div>
              ))
          ) : (
            <h2>No media</h2>
          )}
        </div>
      </div>
    </>
  );
};
