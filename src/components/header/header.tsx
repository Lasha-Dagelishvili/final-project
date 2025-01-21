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
    <header className="bg-gray-300 dark:bg-gray-900 dark:text-gray-100 p-4 shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold hover:text-gray-400">
          <NavLink to={`/${lang}`}>{t('home')}</NavLink>
        </h1>

        {/* Navigation Links - Centered for Desktop */}
        <nav className="hidden md:flex md:justify-center md:items-center md:space-x-6">
          <NavLink
            to={`/${lang}/products`}
            className="text-xl font-bold hover:text-gray-400"
          >
            {t('products')}
          </NavLink>
          {!user && (
            <NavLink
              to={`/${lang}/login`}
              className="text-xl font-bold hover:text-gray-400"
            >
              {t('login')}
            </NavLink>
          )}
          <NavLink
            to={`/${lang}/contact`}
            className="text-xl font-bold hover:text-gray-400"
          >
            {t('contact_us')}
          </NavLink>
        </nav>

        {/* Right-Side Controls for Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            className="bg-gray-800 px-4 py-2 rounded text-white"
            onClick={() => handleLanguageChange('en')}
          >
            EN
          </button>
          <button
            className="bg-gray-800 px-4 py-2 rounded text-white"
            onClick={() => handleLanguageChange('ka')}
          >
            KA
          </button>
          {user && (
            <div className="relative">
              <button
                className="flex items-center space-x-2 hover:bg-gray-600 bg-gray-700 px-4 py-2 rounded text-white"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaUserCircle className="h-5 w-5" />
              </button>
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
        </div>

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

        {/* Mobile Navigation Menu */}
        <nav
          className={`${
            menuOpen
              ? 'absolute top-16 left-0 w-full bg-gray-800 text-white shadow-lg rounded-md p-4 space-y-4'
              : 'hidden'
          } md:hidden`}
        >
          <NavLink
            to={`/${lang}/products`}
            className="block text-xl font-bold hover:text-gray-400"
            onClick={() => setMenuOpen(false)}
          >
            {t('products')}
          </NavLink>
          {!user && (
            <NavLink
              to={`/${lang}/login`}
              className="block text-xl font-bold hover:text-gray-400"
              onClick={() => setMenuOpen(false)}
            >
              {t('login')}
            </NavLink>
          )}
          <NavLink
            to={`/${lang}/contact`}
            className="block text-xl font-bold hover:text-gray-400"
            onClick={() => setMenuOpen(false)}
          >
            {t('contact_us')}
          </NavLink>
          <div className="flex flex-col space-y-2">
            <button
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white"
              onClick={() => {
                handleLanguageChange('en');
                setMenuOpen(false);
              }}
            >
              EN
            </button>
            <button
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white"
              onClick={() => {
                handleLanguageChange('ka');
                setMenuOpen(false);
              }}
            >
              KA
            </button>
          </div>
          {user && (
            <div className="relative">
              <button
                className="flex items-center space-x-2 hover:bg-gray-600 bg-gray-700 px-4 py-2 rounded text-white"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaUserCircle className="h-5 w-5" />
              </button>
              {dropdownOpen && (
                <div className="absolute z-10 right-0 mt-2 w-48 bg-white text-black rounded shadow">
                  <div className="px-4 py-2 border-b">
                    <span className="font-semibold">{username}</span>
                  </div>
                  <NavLink
                    to={`/${lang}/profile`}
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => {
                      setDropdownOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    {t('editProfile')}
                  </NavLink>
                  <button
                    className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                  >
                    {t('logout')}
                  </button>
                </div>
              )}
            </div>
          )}
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
