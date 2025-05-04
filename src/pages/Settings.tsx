import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { User, Bell, Lock, Moon, Sun, Trash2 } from 'lucide-react';

const Settings: React.FC = () => {
  const { user, updateProfile } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-2">Please Sign In</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to be signed in to access settings.
          </p>
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition duration-300"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="grid grid-cols-12 divide-x dark:divide-gray-700">
          {/* Sidebar */}
          <div className="col-span-3 p-6">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                  activeTab === 'profile'
                    ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <User size={18} className="mr-3" />
                Profile
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                  activeTab === 'notifications'
                    ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Bell size={18} className="mr-3" />
                Notifications
              </button>
              
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                  activeTab === 'security'
                    ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Lock size={18} className="mr-3" />
                Security
              </button>
              
              <button
                onClick={() => setActiveTab('appearance')}
                className={`w-full flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                  activeTab === 'appearance'
                    ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {theme === 'dark' ? (
                  <Moon size={18} className="mr-3" />
                ) : (
                  <Sun size={18} className="mr-3" />
                )}
                Appearance
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="col-span-9 p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Profile Picture</label>
                    <div className="flex items-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
                            {user.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <button
                          type="button"
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                        >
                          Change Photo
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <input
                        type="text"
                        defaultValue={user.location}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Website</label>
                      <input
                        type="url"
                        defaultValue={user.website}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <textarea
                      defaultValue={user.bio}
                      rows={4}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2">New campaign matches</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2">Application updates</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2">Messages</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2">Campaign reminders</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Push Notifications</h3>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2">Enable push notifications</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2">Sound</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Change Password</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200"
                      >
                        Update Password
                      </button>
                    </form>
                  </div>

                  <div className="pt-6 border-t dark:border-gray-700">
                    <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                    <button
                      type="button"
                      className="px-6 py-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      Enable 2FA
                    </button>
                  </div>

                  <div className="pt-6 border-t dark:border-gray-700">
                    <h3 className="font-medium text-red-600 dark:text-red-400 mb-4">Danger Zone</h3>
                    <button
                      type="button"
                      className="flex items-center px-6 py-2 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-md hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-200"
                    >
                      <Trash2 size={18} className="mr-2" />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Appearance Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Theme</h3>
                    <button
                      onClick={toggleTheme}
                      className="flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      {theme === 'dark' ? (
                        <>
                          <Sun size={18} className="mr-2" />
                          Switch to Light Mode
                        </>
                      ) : (
                        <>
                          <Moon size={18} className="mr-2" />
                          Switch to Dark Mode
                        </>
                      )}
                    </button>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Color Scheme</h3>
                    <div className="grid grid-cols-6 gap-4">
                      <button className="w-10 h-10 rounded-full bg-teal-500 ring-2 ring-offset-2 ring-teal-500" />
                      <button className="w-10 h-10 rounded-full bg-blue-500" />
                      <button className="w-10 h-10 rounded-full bg-purple-500" />
                      <button className="w-10 h-10 rounded-full bg-pink-500" />
                      <button className="w-10 h-10 rounded-full bg-orange-500" />
                      <button className="w-10 h-10 rounded-full bg-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;