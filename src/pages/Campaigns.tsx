import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCampaigns } from '../context/CampaignContext';
import CampaignFilter from '../components/campaigns/CampaignFilter';
import CampaignCard from '../components/campaigns/CampaignCard';
import { Filter } from '../types';
import { Search } from 'lucide-react';

const Campaigns: React.FC = () => {
  const { filteredCampaigns, filter, setFilter } = useCampaigns();
  const [searchQuery, setSearchQuery] = useState(filter.search || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilter({ ...filter, search: searchQuery });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Volunteer Campaigns</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find and join campaigns that match your interests and skills
          </p>
        </div>
        
        <Link
          to="/campaigns/create"
          className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition duration-300"
        >
          Create Campaign
        </Link>
      </div>

      <div className="mb-8">
        <form onSubmit={handleSearch} className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campaigns by title, description, or location..."
            className="pl-10 pr-4 py-3 w-full border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:border-gray-700"
          />
        </form>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <CampaignFilter
            currentFilter={filter}
            onFilterChange={setFilter}
          />
        </div>

        <div className="lg:w-3/4">
          {filteredCampaigns.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredCampaigns.map(campaign => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No campaigns found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your filters or search criteria
              </p>
              <button
                onClick={() => setFilter({})}
                className="text-teal-600 dark:text-teal-400 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;