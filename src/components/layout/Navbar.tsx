import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Bell, Menu, X, Search, Moon, Sun, LogOut, User as UserIcon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/campaigns?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className={`sticky top-0 z-50 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-teal-600 dark:text-teal-400 text-2xl font-bold">VolunteerConnect</span>
            </Link>
          </div>

          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search campaigns, organizations, causes..."
                className={`w-full pl-10 pr-4 py-2 rounded-full ${
                  theme === 'dark' ? 'bg-gray-700 focus:bg-gray-600' : 'bg-gray-100 focus:bg-gray-200'
                } focus:outline-none transition-all duration-300`}
              />
            </form>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <Link to="/campaigns" className="text-sm font-medium hover:text-teal-600 dark:hover:text-teal-400 transition duration-300">
              Campaigns
            </Link>
            
            <Link to="/organizations" className="text-sm font-medium hover:text-teal-600 dark:hover:text-teal-400 transition duration-300">
              Organizations
            </Link>
            
            {user ? (
              <>
                <Link to="/messages" className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300">
                  <MessageSquare size={20} />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </Link>
                
                <Link to="/notifications" className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </Link>
                
                <div className="relative">
                  <button 
                    onClick={toggleDropdown}
                    className="flex items-center text-sm font-medium hover:underline"
                  >
                    <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-white mr-2 overflow-hidden">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                      ) : (
                        user.name.charAt(0)
                      )}
                    </div>
                    <span className="hidden lg:inline">{user.name}</span>
                  </button>
                  
                  {showDropdown && (
                    <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    } ring-1 ring-black ring-opacity-5 focus:outline-none z-10`}>
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                        onClick={() => setShowDropdown(false)}
                      >
                        <UserIcon size={16} className="mr-2" />
                        Your Profile
                      </Link>
                      
                      <Link 
                        to="/dashboard" 
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setShowDropdown(false)}
                      >
                        Dashboard
                      </Link>
                      
                      <Link 
                        to="/settings" 
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setShowDropdown(false)}
                      >
                        Settings
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      >
                        <LogOut size={16} className="mr-2" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-md text-teal-600 dark:text-teal-400 border border-teal-600 dark:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition duration-300"
                >
                  Sign In
                </Link>
                
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 transition duration-300"
                >
                  Join Us
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg pb-3 px-4`}>
          <form onSubmit={handleSearch} className="pt-2 pb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search campaigns..."
                className={`w-full pl-10 pr-4 py-2 rounded-full ${
                  theme === 'dark' ? 'bg-gray-700 focus:bg-gray-600' : 'bg-gray-100 focus:bg-gray-200'
                } focus:outline-none transition-colors duration-300`}
              />
            </div>
          </form>
          
          <div className="space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            
            <Link 
              to="/campaigns" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={toggleMobileMenu}
            >
              Campaigns
            </Link>
            
            <Link 
              to="/organizations" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={toggleMobileMenu}
            >
              Organizations
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/messages" 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={toggleMobileMenu}
                >
                  Messages
                </Link>
                
                <Link 
                  to="/dashboard" 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={toggleMobileMenu}
                >
                  Dashboard
                </Link>
                
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={toggleMobileMenu}
                >
                  Profile
                </Link>
                
                <Link 
                  to="/settings" 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={toggleMobileMenu}
                >
                  Settings
                </Link>
                
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Sign out
                </button>
              </>
            ) : (
              <div className="pt-2 pb-3 space-y-2">
                <Link
                  to="/login"
                  className="block w-full px-3 py-2 rounded-md text-center font-medium text-teal-600 dark:text-teal-400 border border-teal-600 dark:border-teal-400"
                  onClick={toggleMobileMenu}
                >
                  Sign In
                </Link>
                
                <Link
                  to="/register"
                  className="block w-full px-3 py-2 rounded-md text-center font-medium bg-teal-600 text-white"
                  onClick={toggleMobileMenu}
                >
                  Join Us
                </Link>
              </div>
            )}
            
            <button
              onClick={() => {
                toggleTheme();
                toggleMobileMenu();
              }}
              className="flex w-full px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200 dark:hover:bg-gray-700 items-center"
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={20} className="mr-2" /> Light Mode
                </>
              ) : (
                <>
                  <Moon size={20} className="mr-2" /> Dark Mode
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;