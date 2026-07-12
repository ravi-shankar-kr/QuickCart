import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-6xl font-bold text-[#111111] dark:text-white">404</p>
      <p className="mt-4 text-neutral-500">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-8">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
