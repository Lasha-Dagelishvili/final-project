import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/supabaseClient';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import icons from React Icons

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { lang } = useParams<{ lang: string }>();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLanguageChange = (language: string) => {
    const newPath = pathname.replace(`/${lang}`, `/${language}`);
    i18n.changeLanguage(language);
    navigate(newPath);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <header className="bg-blue-600 text-white dark:bg-gray-900 dark:text-gray-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Website Logo or Title */}
        <h1 className="text-xl font-bold">
          <NavLink to={`/${lang}/`} className="hover:underline">
            {t('home')}
          </NavLink>
        </h1>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-4">
            {user ? (
              <li className="relative">
                {/* Profile Dropdown */}
                <button
                  className="bg-gray-800 px-4 py-2 rounded text-white"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {t('profile')}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow">
                    <button
                      className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                      onClick={handleLogout}
                    >
                      {t('logout')}
                    </button>
                  </div>
                )}
              </li>
            ) : (
              <>
                {/* Login and Register Links */}
                <li>
                  <NavLink to={`/${lang}/login`} className="hover:underline">
                    {t('login')}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/${lang}/register`} className="hover:underline">
                    {t('register')}
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Language Switcher and Theme Toggle */}
        <div className="flex items-center space-x-4">
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
          <button
            className="bg-gray-800 text-white dark:bg-gray-700 dark:text-gray-200 px-4 py-2 rounded flex items-center justify-center"
            onClick={toggleTheme}
          >
            {theme === 'light' ? (
              <FaMoon className="h-5 w-5 text-white" />
            ) : (
              <FaSun className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
