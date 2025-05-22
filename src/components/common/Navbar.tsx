import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { selectIsAuthenticated } from '../../store/slices/authSlice';

const Navbar = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <nav className="bg-primary-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          ATune
        </Link>

        <div className="flex space-x-4">
          <Link to="/" className="hover:text-primary-200">
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-primary-200">
                Dashboard
              </Link>
              <Link to="/dashboard/profile" className="hover:text-primary-200">
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="hover:text-primary-200">
                Login
              </Link>
              <Link to="/auth/register" className="hover:text-primary-200">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
