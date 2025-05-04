import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Calendar, ExternalLink } from 'lucide-react';
import { Organization } from '../../types';

interface OrganizationCardProps {
  organization: Organization;
  compact?: boolean;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({ organization, compact = false }) => {
  if (compact) {
    return (
      <Link 
        to={`/organizations/${organization.id}`}
        className="block group"
      >
        <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition duration-200">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src={organization.logo || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
              alt={organization.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-1">
              <h3 className="font-medium text-sm truncate group-hover:text-teal-600 dark:group-hover:text-teal-400 transition duration-200">
                {organization.name}
              </h3>
              {organization.verified && (
                <span className="ml-1 text-blue-500 dark:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <MapPin size={12} className="mr-1" />
              <span className="truncate">{organization.location}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center p-4 border-b dark:border-gray-700">
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-teal-100 dark:border-teal-900">
          <img 
            src={organization.logo || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
            alt={organization.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4">
          <div className="flex items-center">
            <h3 className="font-semibold text-lg">
              <Link to={`/organizations/${organization.id}`} className="hover:text-teal-600 dark:hover:text-teal-400 transition duration-200">
                {organization.name}
              </Link>
            </h3>
            {organization.verified && (
              <span className="ml-1 text-blue-500 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
            <MapPin size={14} className="mr-1" />
            <span>{organization.location}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {organization.description}
        </p>
        
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <div className="font-semibold text-teal-600 dark:text-teal-400">{organization.stats?.volunteersHelped}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Volunteers</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <div className="font-semibold text-teal-600 dark:text-teal-400">{organization.stats?.campaignsCreated}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Campaigns</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <div className="font-semibold text-teal-600 dark:text-teal-400">{organization.stats?.totalHours}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total Hours</div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {organization.causes.slice(0, 3).map((cause, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300"
            >
              {cause}
            </span>
          ))}
          {organization.causes.length > 3 && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              +{organization.causes.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Link 
            to={`/organizations/${organization.id}`}
            className="flex-1 text-center px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition duration-300"
          >
            View Profile
          </Link>
          
          {organization.website && (
            <a
              href={organization.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
              aria-label="Visit website"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationCard;