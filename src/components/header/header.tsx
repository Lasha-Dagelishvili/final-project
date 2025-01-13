import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/supabaseClient';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { FaSun, FaMoon } from 'react-icons/fa';
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
    <header className="bg-blue-600 text-white dark:bg-gray-900 dark:text-gray-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <NavLink to={`/${lang}/`} className="hover:underline">
            {t('home')}
          </NavLink>
        </h1>

        <nav>
          <ul className="flex space-x-4">
            {user ? (
                <li className="relative">
                  <button
                    className="bg-gray-800 px-4 py-2 rounded text-white"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {username ?? 'Profile'}
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow">
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
                </li>
            ) : (
                <li>
                  <NavLink to={`/${lang}/login`} className="hover:underline">
                    {t('login')}
                  </NavLink>
                </li>
            )}
          </ul>
        </nav>

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
              <FaMoon className="h-5 w-5 text-yellow-400" />
            ) : (
              <FaSun className="h-5 w-5 text-yellow-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
