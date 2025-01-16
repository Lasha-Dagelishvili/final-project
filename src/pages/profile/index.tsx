import { useEffect } from 'react';
import { supabase } from '@/supabaseClient';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .nonempty({ message: 'Email is required' }),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(20, { message: 'Username must not exceed 20 characters' }),
});

type FormData = z.infer<typeof schema>;

const Profile = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: user?.email ?? '',
      username: '',
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', user.id)
            .single();

          if (error) throw error;
          reset({
            email: user.email ?? '',
            username: data?.username || '',
          });
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchProfile();
  }, [user, reset]);

  const updateProfile = async (data: FormData) => {
    try {
      const updates = {
        id: user?.id,
        email: data.email,
        username: data.username,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;

      alert(t('profile_updated'));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{t('profile')}</h2>
      <form onSubmit={handleSubmit(updateProfile)}>
        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            {t('email')}
          </label>
          <input
            type="email"
            id="email"
            placeholder={t('email')}
            {...register('email')}
            className={`w-full border rounded p-2 text-black ${
              errors.email ? 'border-red-500' : ''
            }`}
          />
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Username Field */}
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium mb-1">
            {t('username')}
          </label>
          <input
            type="text"
            id="username"
            placeholder={t('username')}
            {...register('username')}
            className={`w-full border rounded p-2 text-black ${
              errors.username ? 'border-red-500' : ''
            }`}
          />
          {errors.username && (
            <p className="text-red-500 mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded"
        >
          {t('save_changes')}
        </button>
      </form>
    </div>
  );
};

export default Profile;
