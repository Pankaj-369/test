import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Campaign } from '../../types';
import { format } from 'date-fns';

interface CampaignCardProps {
  campaign: Campaign;
  compact?: boolean;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, compact = false }) => {
  const getUrgencyColor = (level?: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (compact) {
    return (
      <Link 
        to={`/campaigns/${campaign.id}`}
        className="block group"
      >
        <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition duration-200">
          <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
            <img 
              src={campaign.image || 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-sm truncate group-hover:text-teal-600 dark:group-hover:text-teal-400 transition duration-200">
                {campaign.title}
              </h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(campaign.status)}`}>
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </span>
            </div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <MapPin size={12} className="mr-1" />
              <span className="truncate">{campaign.location}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
              <Calendar size={12} className="mr-1" />
              <span>{format(new Date(campaign.startDate), 'MMM d, yyyy')}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={campaign.image || 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
          alt={campaign.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(campaign.status)}`}>
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </span>
          {campaign.urgencyLevel && (
            <span className={`text-xs px-2 py-1 rounded-full ${getUrgencyColor(campaign.urgencyLevel)}`}>
              {campaign.urgencyLevel.charAt(0).toUpperCase() + campaign.urgencyLevel.slice(1)} Priority
            </span>
          )}
        </div>
        {campaign.isRemote && (
          <span className="absolute top-3 right-3 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 text-xs px-2 py-1 rounded-full">
            Remote
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 hover:text-teal-600 dark:hover:text-teal-400 transition duration-200">
          <Link to={`/campaigns/${campaign.id}`}>{campaign.title}</Link>
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {campaign.description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin size={16} className="mr-1.5" />
            <span className="truncate">{campaign.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar size={16} className="mr-1.5" />
            <span>{format(new Date(campaign.startDate), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Clock size={16} className="mr-1.5" />
            <span>{campaign.requiredHours} hours</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Users size={16} className="mr-1.5" />
            <span>{campaign.openings} openings</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {campaign.causes.slice(0, 3).map((cause, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300"
            >
              {cause}
            </span>
          ))}
          {campaign.causes.length > 3 && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              +{campaign.causes.length - 3} more
            </span>
          )}
        </div>
        
        <Link 
          to={`/campaigns/${campaign.id}`}
          className="block w-full text-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CampaignCard;