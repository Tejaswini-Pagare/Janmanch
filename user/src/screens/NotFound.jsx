import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-2 text-lg text-gray-600">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="px-6 py-2 mt-4 text-white transition-all bg-teal-500 rounded-lg hover:bg-teal-700"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
