import { useState, useEffect } from 'react';
import { supabase } from '@/supabaseClient';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';

const Profile = () => {
    const { t } = useTranslation();
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email ?? '');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setUsername(data?.username || '');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updates = {
        id: user?.id,
        email,
        username,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;

      setMessage('Profile updated successfully!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
      setMessage('Changes saved!');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{t('profile')}</h2>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <form onSubmit={updateProfile}>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            {t('email')}
          </label>
          <input
            type="email"
            id="email"
            placeholder={t('email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium mb-1">
            {t('username')}
          </label>
          <input
            type="text"
            id="username"
            placeholder={t('username')}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded p-2 text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Saving...' : t('save_changes')}
        </button>
      </form>
    </div>
  );
};

export default Profile;
