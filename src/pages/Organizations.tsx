import React, { useState } from 'react';
import { Search } from 'lucide-react';
import OrganizationCard from '../components/campaigns/OrganizationCard';
import { mockOrganizations, mockCauses } from '../data/mockData';

const Organizations: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCause, setSelectedCause] = useState<string | null>(null);

  const filteredOrganizations = mockOrganizations.filter(org => {
    const matchesSearch = !searchQuery || 
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.location?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCause = !selectedCause || org.causes.includes(selectedCause);

    return matchesSearch && matchesCause;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Organizations</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Connect with organizations making a difference in your community
        </p>
      </div>

      <div className="mb-8">
        <div className="max-w-2xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search organizations by name, description, or location..."
              className="pl-10 pr-4 py-3 w-full border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-medium mb-3">Filter by cause</h2>
        <div className="flex flex-wrap gap-2">
          {mockCauses.map(cause => (
            <button
              key={cause}
              onClick={() => setSelectedCause(selectedCause === cause ? null : cause)}
              className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
                selectedCause === cause
                  ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {cause}
            </button>
          ))}
        </div>
      </div>

      {filteredOrganizations.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrganizations.map(organization => (
            <OrganizationCard
              key={organization.id}
              organization={organization}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No organizations found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your search criteria
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCause(null);
            }}
            className="text-teal-600 dark:text-teal-400 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Organizations;