import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/supabaseClient';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { FaSun, FaMoon, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from '@/hooks/useTheme';

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { lang } = useParams<{ lang: string }>();
  const { user, setUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [username, setUsername] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          setUsername(data.username);
        }
      }
    };

    fetchUsername();
  }, [user]);

  const handleLanguageChange = (language: string) => {
    const newPath = pathname.replace(`/${lang}`, `/${language}`);
    i18n.changeLanguage(language);
    navigate(newPath);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate(`/${lang}/login`);
  };

  return (
    <header className="bg-gray-300 dark:bg-gray-900 dark:text-gray-100 p-4 shadow-md z-10 pl-16">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold hover:text-gray-400">
          <NavLink to={`/${lang}`} className="">
            {t('home')}
          </NavLink>
        </h1>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden bg-gray-800 text-white px-3 py-2 rounded"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <FaTimes className="h-5 w-5" />
          ) : (
            <FaBars className="h-5 w-5" />
          )}
        </button>

        <div>
        <NavLink
            to={`/${lang}/products`}
            className="block md:inline text-xl font-bold hover:text-gray-400"
          >
            {t('products')}
          </NavLink>

          {!user && (
            <NavLink
              to={`/${lang}/login`}
              className="block md:inline text-xl font-bold hover:text-gray-400"
            >
              {t('login')}
            </NavLink>
          )}
        </div>


        {/* Navigation Links */}
        <nav
          className={`${
            menuOpen ? 'absolute top-16 left-0 w-full bg-gray-800 text-white shadow-lg rounded-md p-4 space-y-4' : 'hidden'
          } md:flex md:items-center md:space-x-4 md:space-y-0`}
        >

          {/* Language Switcher */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <button
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white"
              onClick={() => handleLanguageChange('en')}
            >
              EN
            </button>
            <button
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white"
              onClick={() => handleLanguageChange('ka')}
            >
              KA
            </button>
          </div>

          {/* Profile Dropdown */}
          {user && (
            <div className="relative">
              <button
                className="flex items-center space-x-2 hover:bg-gray-600 bg-gray-700 px-4 py-2 rounded text-white"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaUserCircle className="h-5 w-5" />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute z-10 right-0 mt-2 w-48 bg-white text-black rounded shadow">
                  <div className="px-4 py-2 border-b">
                    <span className="font-semibold">{username}</span>
                  </div>
                  <NavLink
                    to={`/${lang}/profile`}
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {t('editProfile')}
                  </NavLink>
                  <button
                    className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    {t('logout')}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Theme Toggle */}
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center justify-center"
            onClick={toggleTheme}
          >
            {theme === 'light' ? (
              <FaMoon className="h-5 w-5 text-yellow-400" />
            ) : (
              <FaSun className="h-5 w-5 text-yellow-400" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
