import { Link, useRouteError } from "react-router-dom";




const ErrorPage = () => {
  const error = useRouteError();
  // console.error(error);

  const errorDetails = Object.entries(error).map((item, index) => {
    return <li key={index}>{item[0] + "-" + item[1]}</li>;
  });

  return (
    <div id="error-page">
      <h2>Oops!</h2>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <ul>{errorDetails}</ul>

      <nav>
        <Link to={`/`}>Home</Link>
      </nav>
    </div>
  );
};

export default ErrorPage;
