import "./SearchMediaResults.css";

export const SearchMediaResults = ({ searchValue, passAllMedia }) => {
  return (
    <>
      <div className="search-media-container">
        <div className="section-name">SEARCH RESULTS</div>
        <div className="search-media-section-container">
          {passAllMedia.length > 0 ? (
            passAllMedia
              .filter((media) =>
                media.name.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((media, index) => (
                <div key={index} className="media-card">
                  <img className="media-card-img" src={media.image_url} />
                  <div
                    onClick={() =>
                      handleMediaNameClick(passAllMedia.indexOf(media))
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
            <h2>No media found.</h2>
          )}
        </div>
      </div>
    </>
  );
};
