import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { logout } from '../../store/slices/authSlice';

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className="w-64 bg-primary-800 text-white p-6 space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>

      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `block p-2 rounded hover:bg-primary-700 ${isActive ? 'bg-primary-700' : ''}`
          }
        >
          Overview
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `block p-2 rounded hover:bg-primary-700 ${isActive ? 'bg-primary-700' : ''}`
          }
        >
          Profile
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `block p-2 rounded hover:bg-primary-700 ${isActive ? 'bg-primary-700' : ''}`
          }
        >
          Settings
        </NavLink>
      </nav>

      <div className="pt-6 mt-6 border-t border-primary-700">
        <button
          onClick={handleLogout}
          className="w-full p-2 text-left rounded hover:bg-primary-700"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
