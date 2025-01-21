import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from 'react-icons/fa';

const Contact: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-6xl w-full bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 md:p-10 grid md:grid-cols-2 gap-10">
        {/* Contact Form Section */}
        <div>
          <h1 className="text-3xl font-bold mb-6">{t('contact_us')}</h1>
          {submitted && (
            <p className="mb-4 text-green-600 font-medium">
              {t('thanks_for_message')}
            </p>
          )}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block font-medium mb-1">
                {t('name')}
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('your_name')}
                required
                className="w-full border text-black border-gray-300 dark:border-gray-700 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium mb-1">
                {t('email')}
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('your_email')}
                required
                className="w-full border text-black border-gray-300 dark:border-gray-700 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block font-medium mb-1">
                {t('subject')}
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={t('subject')}
                required
                className="w-full border text-black border-gray-300 dark:border-gray-700 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-medium mb-1">
                {t('message')}
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder={t('your_message')}
                required
                className="w-full border text-black border-gray-300 dark:border-gray-700 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition"
            >
              {t('submit')}
            </button>
          </form>
        </div>

        {/* Contact Information Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">{t('get_in_touch')}</h2>
          <p className="mb-4">{t('contact_for_anything')}</p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-blue-600 dark:text-blue-400" />
              <span>+1 234 567 890</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-blue-600 dark:text-blue-400" />
              <span>contact@yourwebsite.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400" />
              <span>123 Main Street, Anytown, USA</span>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-6">
            <p className="mb-2">{t('follow_us')}</p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                <FaFacebook className="inline-block h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 dark:text-blue-300 hover:underline"
              >
                <FaTwitter className="inline-block h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 dark:text-blue-500 hover:underline"
              >
                <FaLinkedin className="inline-block h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
