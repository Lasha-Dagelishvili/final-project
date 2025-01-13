import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/supabaseClient';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { lang } = useParams<{ lang: string }>();
  const { user } = useAuth();
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
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <NavLink to={`/${lang}/`} className="hover:underline">
            {i18n.t('home')}
          </NavLink>
        </h1>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-4">
            {user ? (
              <>
                {/* Profile with Dropdown */}
                <li className="relative">
                  <button
                    className="bg-gray-800 px-4 py-2 rounded text-white"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {i18n.t('Profile')}
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow">
                      <button
                        className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                        onClick={handleLogout}
                      >
                        {i18n.t('Logout')}
                      </button>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                {/* Login and Register Links */}
                <li>
                  <NavLink
                    to={`/${lang}/login`}
                    className="hover:underline"
                  >
                    {i18n.t('login')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/${lang}/register`}
                    className="hover:underline"
                  >
                    {i18n.t('register')}
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Language Switcher */}
        <div className="flex space-x-2">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
