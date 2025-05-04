import React, { useState } from 'react';
import { Filter as FilterIcon, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Filter } from '../../types';
import { mockCauses, mockSkills, mockLocations } from '../../data/mockData';

interface CampaignFilterProps {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}

const CampaignFilter: React.FC<CampaignFilterProps> = ({ 
  currentFilter, 
  onFilterChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    causes: true,
    skills: false,
    location: true,
    status: true,
    urgency: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const handleCauseChange = (cause: string) => {
    const causes = currentFilter.causes || [];
    const updatedCauses = causes.includes(cause)
      ? causes.filter(c => c !== cause)
      : [...causes, cause];
    
    onFilterChange({
      ...currentFilter,
      causes: updatedCauses.length ? updatedCauses : undefined
    });
  };

  const handleSkillChange = (skill: string) => {
    const skills = currentFilter.skills || [];
    const updatedSkills = skills.includes(skill)
      ? skills.filter(s => s !== skill)
      : [...skills, skill];
    
    onFilterChange({
      ...currentFilter,
      skills: updatedSkills.length ? updatedSkills : undefined
    });
  };

  const handleLocationChange = (location: string) => {
    onFilterChange({
      ...currentFilter,
      location: currentFilter.location === location ? undefined : location
    });
  };

  const handleRemoteChange = (isRemote: boolean) => {
    onFilterChange({
      ...currentFilter,
      remote: currentFilter.remote === isRemote ? undefined : isRemote
    });
  };

  const handleStatusChange = (status: 'active' | 'completed' | 'upcoming') => {
    const statuses = currentFilter.status || [];
    const updatedStatuses = statuses.includes(status)
      ? statuses.filter(s => s !== status)
      : [...statuses, status];
    
    onFilterChange({
      ...currentFilter,
      status: updatedStatuses.length ? updatedStatuses : undefined
    });
  };

  const handleUrgencyChange = (urgency: 'low' | 'medium' | 'high') => {
    const urgencies = currentFilter.urgency || [];
    const updatedUrgencies = urgencies.includes(urgency)
      ? urgencies.filter(u => u !== urgency)
      : [...urgencies, urgency];
    
    onFilterChange({
      ...currentFilter,
      urgency: updatedUrgencies.length ? updatedUrgencies : undefined
    });
  };

  const handleSortChange = (sortBy: 'newest' | 'popularity' | 'urgency' | 'endingSoon') => {
    onFilterChange({
      ...currentFilter,
      sortBy: currentFilter.sortBy === sortBy ? undefined : sortBy
    });
  };

  const clearFilters = () => {
    onFilterChange({
      search: currentFilter.search
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (currentFilter.causes && currentFilter.causes.length > 0) count++;
    if (currentFilter.skills && currentFilter.skills.length > 0) count++;
    if (currentFilter.location) count++;
    if (currentFilter.remote !== undefined) count++;
    if (currentFilter.status && currentFilter.status.length > 0) count++;
    if (currentFilter.urgency && currentFilter.urgency.length > 0) count++;
    return count;
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium"
        >
          <FilterIcon size={18} className="mr-2" />
          Filters
          {getActiveFilterCount() > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 rounded-full text-xs font-semibold">
              {getActiveFilterCount()}
            </span>
          )}
        </button>
        
        {getActiveFilterCount() > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 dark:text-red-400 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
      
      {isOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mt-2 animate-slideDown">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Causes Section */}
            <div>
              <button 
                className="flex items-center justify-between w-full text-left font-medium mb-2"
                onClick={() => toggleSection('causes')}
              >
                <span>Causes</span>
                {expandedSections.causes ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              
              {expandedSections.causes && (
                <div className="space-y-1 max-h-48 overflow-y-auto pr-2 pb-1 custom-scrollbar">
                  {mockCauses.map(cause => (
                    <label key={cause} className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <input
                        type="checkbox"
                        checked={currentFilter.causes?.includes(cause) || false}
                        onChange={() => handleCauseChange(cause)}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <span className="text-sm">{cause}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            
            {/* Skills Section */}
            <div>
              <button 
                className="flex items-center justify-between w-full text-left font-medium mb-2"
                onClick={() => toggleSection('skills')}
              >
                <span>Skills</span>
                {expandedSections.skills ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              
              {expandedSections.skills && (
                <div className="space-y-1 max-h-48 overflow-y-auto pr-2 pb-1 custom-scrollbar">
                  {mockSkills.map(skill => (
                    <label key={skill} className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <input
                        type="checkbox"
                        checked={currentFilter.skills?.includes(skill) || false}
                        onChange={() => handleSkillChange(skill)}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <span className="text-sm">{skill}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            
            {/* Location Section */}
            <div>
              <button 
                className="flex items-center justify-between w-full text-left font-medium mb-2"
                onClick={() => toggleSection('location')}
              >
                <span>Location</span>
                {expandedSections.location ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              
              {expandedSections.location && (
                <div className="space-y-2">
                  <div className="mb-2">
                    <label className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <input
                        type="checkbox"
                        checked={currentFilter.remote === true}
                        onChange={() => handleRemoteChange(true)}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <span className="text-sm">Remote Only</span>
                    </label>
                  </div>
                  
                  <div className="max-h-36 overflow-y-auto pr-2 custom-scrollbar">
                    {mockLocations.map(location => (
                      <label key={location} className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        <input
                          type="radio"
                          name="location"
                          checked={currentFilter.location === location}
                          onChange={() => handleLocationChange(location)}
                          className="rounded-full border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="text-sm">{location}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Status Section */}
            <div>
              <button 
                className="flex items-center justify-between w-full text-left font-medium mb-2"
                onClick={() => toggleSection('status')}
              >
                <span>Status</span>
                {expandedSections.status ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              
              {expandedSections.status && (
                <div className="space-y-1">
                  <label className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <input
                      type="checkbox"
                      checked={currentFilter.status?.includes('active') || false}
                      onChange={() => handleStatusChange('active')}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <span className="text-sm">Active</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <input
                      type="checkbox"
                      checked={currentFilter.status?.includes('upcoming') || false}
                      onChange={() => handleStatusChange('upcoming')}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <span className="text-sm">Upcoming</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <input
                      type="checkbox"
                      checked={currentFilter.status?.includes('completed') || false}
                      onChange={() => handleStatusChange('completed')}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <span className="text-sm">Completed</span>
                  </label>
                </div>
              )}
            </div>
            
            {/* Urgency Section */}
            <div>
              <button 
                className="flex items-center justify-between w-full text-left font-medium mb-2"
                onClick={() => toggleSection('urgency')}
              >
                <span>Priority Level</span>
                {expandedSections.urgency ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              
              {expandedSections.urgency && (
                <div className="space-y-1">
                  <label className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <input
                      type="checkbox"
                      checked={currentFilter.urgency?.includes('high') || false}
                      onChange={() => handleUrgencyChange('high')}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <span className="text-sm">High</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <input
                      type="checkbox"
                      checked={currentFilter.urgency?.includes('medium') || false}
                      onChange={() => handleUrgencyChange('medium')}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <span className="text-sm">Medium</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <input
                      type="checkbox"
                      checked={currentFilter.urgency?.includes('low') || false}
                      onChange={() => handleUrgencyChange('low')}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <span className="text-sm">Low</span>
                  </label>
                </div>
              )}
            </div>
            
            {/* Sort Section */}
            <div>
              <h3 className="font-medium mb-2">Sort By</h3>
              <div className="space-y-1">
                <label className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <input
                    type="radio"
                    name="sort"
                    checked={currentFilter.sortBy === 'newest'}
                    onChange={() => handleSortChange('newest')}
                    className="rounded-full border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <span className="text-sm">Newest</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <input
                    type="radio"
                    name="sort"
                    checked={currentFilter.sortBy === 'popularity'}
                    onChange={() => handleSortChange('popularity')}
                    className="rounded-full border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <span className="text-sm">Most Popular</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <input
                    type="radio"
                    name="sort"
                    checked={currentFilter.sortBy === 'urgency'}
                    onChange={() => handleSortChange('urgency')}
                    className="rounded-full border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <span className="text-sm">Highest Priority</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <input
                    type="radio"
                    name="sort"
                    checked={currentFilter.sortBy === 'endingSoon'}
                    onChange={() => handleSortChange('endingSoon')}
                    className="rounded-full border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <span className="text-sm">Ending Soon</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignFilter;