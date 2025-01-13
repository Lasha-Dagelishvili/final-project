import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/supabaseClient';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">My Website</h1>
        <nav>
          <ul className="flex space-x-4">
            {user ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:underline bg-red-500 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/login" className="hover:underline">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className="hover:underline">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
