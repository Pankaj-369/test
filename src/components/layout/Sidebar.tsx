import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Building2, Calendar, MessageSquare, Settings, Award, BarChart, Heart, Users } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

const Sidebar = () => {
  const { theme } = useTheme();
  const { user } = useUser();
  
  const volunteerNavItems = [
    { path: '/', icon: <Home size={20} />, label: 'Home' },
    { path: '/campaigns', icon: <Search size={20} />, label: 'Find Campaigns' },
    { path: '/organizations', icon: <Building2 size={20} />, label: 'Organizations' },
    { path: '/events', icon: <Calendar size={20} />, label: 'Events' },
    { path: '/messages', icon: <MessageSquare size={20} />, label: 'Messages' },
    { path: '/impact', icon: <Award size={20} />, label: 'My Impact' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];
  
  const organizationNavItems = [
    { path: '/', icon: <Home size={20} />, label: 'Home' },
    { path: '/dashboard', icon: <BarChart size={20} />, label: 'Dashboard' },
    { path: '/campaigns/manage', icon: <Heart size={20} />, label: 'My Campaigns' },
    { path: '/volunteers', icon: <Users size={20} />, label: 'Volunteers' },
    { path: '/events/manage', icon: <Calendar size={20} />, label: 'Events' },
    { path: '/messages', icon: <MessageSquare size={20} />, label: 'Messages' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];
  
  const navItems = user?.userType === 'organization' ? organizationNavItems : volunteerNavItems;

  return (
    <aside className={`hidden md:block w-16 lg:w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300 ease-in-out ${
      theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
    }`}>
      <nav className="p-4 h-full">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-2 lg:p-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-teal-600 text-white'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`
                }
                end={item.path === '/'} // Only exact match for home
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="hidden lg:block ml-3 font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        
        {user && (
          <div className="mt-8 hidden lg:block">
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h4 className="font-semibold mb-2">{user.userType === 'volunteer' ? 'Volunteer Stats' : 'Organization Stats'}</h4>
              {user.userType === 'volunteer' ? (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Campaigns:</span>
                    <span className="font-medium">{user.stats?.campaignsJoined || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hours:</span>
                    <span className="font-medium">{user.stats?.hoursContributed || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Impact Points:</span>
                    <span className="font-medium">{user.stats?.impactPoints || 0}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Campaigns:</span>
                    <span className="font-medium">{user.stats?.campaignsCreated || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Volunteers:</span>
                    <span className="font-medium">{user.stats?.volunteersHelped || 0}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;