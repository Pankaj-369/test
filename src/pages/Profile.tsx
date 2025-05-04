import React from 'react';
import { useUser } from '../context/UserContext';
import { useCampaigns } from '../context/CampaignContext';
import CampaignCard from '../components/campaigns/CampaignCard';
import { MapPin, Mail, Globe, Calendar, Award, Heart } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useUser();
  const { filteredCampaigns } = useCampaigns();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-2">Please Sign In</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to be signed in to view your profile.
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

  const userCampaigns = filteredCampaigns.filter(campaign => {
    if (user.userType === 'volunteer') {
      return campaign.volunteers.includes(user.id) || campaign.applicants.includes(user.id);
    } else {
      return campaign.organizationId === user.id;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-teal-100 dark:border-teal-900">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-600 dark:text-teal-400 text-3xl font-bold">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="ml-6">
                  <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin size={18} className="mr-2" />
                    <span>{user.location || 'Location not set'}</span>
                  </div>
                  <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                    <Mail size={18} className="mr-2" />
                    <span>{user.email}</span>
                  </div>
                  {user.website && (
                    <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                      <Globe size={18} className="mr-2" />
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 dark:text-teal-400 hover:underline"
                      >
                        {user.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {user.bio && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">About</h2>
                  <p className="text-gray-600 dark:text-gray-400">{user.bio}</p>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                    {user.userType === 'volunteer'
                      ? user.stats?.campaignsJoined
                      : user.stats?.campaignsCreated}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Campaigns</div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                    {user.userType === 'volunteer'
                      ? user.stats?.hoursContributed
                      : user.stats?.volunteersHelped}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {user.userType === 'volunteer' ? 'Hours' : 'Volunteers'}
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                    {user.stats?.impactPoints}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Impact Points</div>
                </div>
                
                {user.userType === 'volunteer' && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                      {user.stats?.endorsements}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Endorsements</div>
                  </div>
                )}
              </div>

              {user.skills && user.skills.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {user.causes && user.causes.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Causes</h2>
                  <div className="flex flex-wrap gap-2">
                    {user.causes.map((cause, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300 rounded-full text-sm"
                      >
                        {cause}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">
              {user.userType === 'volunteer' ? 'My Campaigns' : 'Created Campaigns'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {userCampaigns.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
              
              {userCampaigns.length === 0 && (
                <div className="col-span-2 text-center py-8">
                  <Heart size={40} className="mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {user.userType === 'volunteer'
                      ? "You haven't joined any campaigns yet"
                      : "You haven't created any campaigns yet"}
                  </p>
                  <a
                    href={user.userType === 'volunteer' ? '/campaigns' : '/campaigns/create'}
                    className="text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    {user.userType === 'volunteer'
                      ? 'Browse campaigns'
                      : 'Create a campaign'}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Availability</h2>
            {user.availability ? (
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Schedule</div>
                  <div className="font-medium">
                    {[
                      user.availability.weekdays && 'Weekdays',
                      user.availability.weekends && 'Weekends'
                    ].filter(Boolean).join(', ')}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Hours per week</div>
                  <div className="font-medium">{user.availability.hours} hours</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Preferences</div>
                  <div className="font-medium">
                    {[
                      user.availability.remotely && 'Remote',
                      user.availability.inPerson && 'In Person'
                    ].filter(Boolean).join(', ')}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                No availability information set
              </p>
            )}
          </div>

          {user.userType === 'volunteer' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <Award size={16} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">Completed campaign "Urban Tree Planting"</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">2 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Heart size={16} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">Applied to "After-School Tutoring"</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">5 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {user.userType === 'organization' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Active Campaigns
                  </div>
                  <div className="font-medium">
                    {userCampaigns.filter(c => c.status === 'active').length}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Applications
                  </div>
                  <div className="font-medium">
                    {userCampaigns.reduce((sum, c) => sum + c.applicants.length, 0)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Active Volunteers
                  </div>
                  <div className="font-medium">
                    {userCampaigns.reduce((sum, c) => sum + c.volunteers.length, 0)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;