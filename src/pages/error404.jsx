import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
            404 - Page Not Found
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sorry, the page you are looking for does not exist.
          </p>
          <Link to="/" className="block w-full p-3 mt-4 bg-primary text-white text-center rounded-md">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
