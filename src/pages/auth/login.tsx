import React, { useState } from 'react';
import { supabase } from '@/supabaseClient';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { lang } = useParams<{ lang: string }>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate(`/${lang}/`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-32">
      <h2 className="text-2xl font-bold mb-4">{t('login')}</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            {t('email')}
          </label>
          <input
            id="email"
            type="email"
            placeholder={t('email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-1">
            {t('password')}
          </label>
          <input
            id="password"
            type="password"
            placeholder={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded p-2 text-black"
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex gap-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded"
          >
            {t('login')}
          </button>
          <NavLink
            className="w-full bg-blue-500 text-white py-2 px-4 rounded text-center"
            to={`/${lang}/register`}
          >
            {t('register')}
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
