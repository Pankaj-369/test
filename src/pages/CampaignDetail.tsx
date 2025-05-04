import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCampaigns } from '../context/CampaignContext';
import { useUser } from '../context/UserContext';
import { Calendar, MapPin, Clock, Users, Heart, Share2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getCampaign, applyCampaign } = useCampaigns();
  const { user } = useUser();
  const campaign = getCampaign(id || '');

  if (!campaign) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold mb-2">Campaign Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The campaign you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/campaigns"
            className="inline-block px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition duration-300"
          >
            Browse Campaigns
          </Link>
        </div>
      </div>
    );
  }

  const handleApply = async () => {
    if (!user) return;
    await applyCampaign(campaign.id, user.id);
  };

  const hasApplied = user && campaign.applicants.includes(user.id);
  const isVolunteer = user && campaign.volunteers.includes(user.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/campaigns" className="text-teal-600 dark:text-teal-400 hover:underline mb-4 inline-block">
          ← Back to Campaigns
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
            <img
              src={campaign.image || 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
              alt={campaign.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-sm px-3 py-1 rounded-full ${
                  campaign.status === 'active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </span>
                {campaign.urgencyLevel && (
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    campaign.urgencyLevel === 'high'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      : campaign.urgencyLevel === 'medium'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    {campaign.urgencyLevel.charAt(0).toUpperCase() + campaign.urgencyLevel.slice(1)} Priority
                  </span>
                )}
                {campaign.isRemote && (
                  <span className="text-sm px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                    Remote
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin size={18} className="mr-2" />
                  <span>{campaign.location}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar size={18} className="mr-2" />
                  <span>{format(new Date(campaign.startDate), 'MMM d, yyyy')}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Clock size={18} className="mr-2" />
                  <span>{campaign.requiredHours} hours</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Users size={18} className="mr-2" />
                  <span>{campaign.openings} openings</span>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                  {campaign.description}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {campaign.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Impact Areas</h2>
            <div className="flex flex-wrap gap-2">
              {campaign.causes.map((cause, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300 rounded-full text-sm"
                >
                  {cause}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">Get Involved</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {campaign.openings} spots remaining
                </p>
              </div>
              <button
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                title="Share campaign"
              >
                <Share2 size={20} />
              </button>
            </div>

            {!user ? (
              <div className="text-center py-4">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Sign in to apply for this campaign
                </p>
                <Link
                  to="/login"
                  className="block w-full px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition duration-300"
                >
                  Sign In
                </Link>
              </div>
            ) : isVolunteer ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart size={24} className="text-green-600 dark:text-green-400" />
                </div>
                <p className="text-green-600 dark:text-green-400 font-medium">
                  You're volunteering in this campaign
                </p>
              </div>
            ) : hasApplied ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-medium">
                  Application submitted
                </p>
              </div>
            ) : (
              <button
                onClick={handleApply}
                className="w-full px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition duration-300"
              >
                Apply Now
              </button>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Organization</h2>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                {/* Organization logo would go here */}
              </div>
              <div className="ml-4">
                <h3 className="font-medium">Organization Name</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  View profile →
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Campaign Stats</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Applications</span>
                  <span className="font-medium">{campaign.applicants.length}</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div
                    className="h-2 bg-teal-600 rounded-full"
                    style={{
                      width: `${(campaign.applicants.length / campaign.openings) * 100}%`
                    }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Volunteers</span>
                  <span className="font-medium">{campaign.volunteers.length}</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div
                    className="h-2 bg-teal-600 rounded-full"
                    style={{
                      width: `${(campaign.volunteers.length / campaign.openings) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;