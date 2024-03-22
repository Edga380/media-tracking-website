import "./NotFound.css";

function NotFound() {
  return (
    <>
      <div className="notfound-container">
        <a className="notfound-message font-large">404</a>
        <a className="notfound-message font-small">
          The page you are looking for has been removed or never existed.
        </a>
      </div>
    </>
  );
}

export default NotFound;
