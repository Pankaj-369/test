import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Users, Calendar, ExternalLink, Facebook, Twitter, Instagram, Linkedin, AlertCircle } from 'lucide-react';
import { mockOrganizations } from '../data/mockData';
import CampaignCard from '../components/campaigns/CampaignCard';
import { useCampaigns } from '../context/CampaignContext';

const OrganizationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const organization = mockOrganizations.find(org => org.id === id);
  const { filteredCampaigns } = useCampaigns();

  const organizationCampaigns = filteredCampaigns.filter(
    campaign => campaign.organizationId === id
  );

  if (!organization) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold mb-2">Organization Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The organization you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/organizations"
            className="inline-block px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition duration-300"
          >
            Browse Organizations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/organizations" className="text-teal-600 dark:text-teal-400 hover:underline mb-4 inline-block">
          ← Back to Organizations
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 border-teal-100 dark:border-teal-900">
                  <img
                    src={organization.logo}
                    alt={organization.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-6">
                  <div className="flex items-center">
                    <h1 className="text-3xl font-bold">{organization.name}</h1>
                    {organization.verified && (
                      <span className="ml-2 text-blue-500 dark:text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                          <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                    <MapPin size={18} className="mr-2" />
                    <span>{organization.location}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    {organization.website && (
                      <a
                        href={organization.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 dark:text-teal-400 hover:underline flex items-center"
                      >
                        Visit Website
                        <ExternalLink size={16} className="ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {organization.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {organization.causes.map((cause, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300 rounded-full text-sm"
                  >
                    {cause}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                    {organization.stats?.volunteersHelped}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Volunteers</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                    {organization.stats?.campaignsCreated}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Campaigns</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                    {organization.stats?.totalHours}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Hours</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Active Campaigns</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {organizationCampaigns
                .filter(campaign => campaign.status === 'active')
                .map(campaign => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              
              {organizationCampaigns.filter(campaign => campaign.status === 'active').length === 0 && (
                <div className="col-span-2 text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400">
                    No active campaigns at the moment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Organization Info</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Founded</div>
                <div className="font-medium">{organization.foundedYear}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Size</div>
                <div className="font-medium">{organization.size}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Social Media</div>
                <div className="flex space-x-4 mt-2">
                  {organization.socialLinks?.facebook && (
                    <a
                      href={organization.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      <Facebook size={20} />
                    </a>
                  )}
                  {organization.socialLinks?.twitter && (
                    <a
                      href={organization.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      <Twitter size={20} />
                    </a>
                  )}
                  {organization.socialLinks?.instagram && (
                    <a
                      href={organization.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      <Instagram size={20} />
                    </a>
                  )}
                  {organization.socialLinks?.linkedin && (
                    <a
                      href={organization.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Contact</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Email</div>
                <a
                  href={`mailto:${organization.email}`}
                  className="text-teal-600 dark:text-teal-400 hover:underline"
                >
                  {organization.email}
                </a>
              </div>
              {organization.website && (
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Website</div>
                  <a
                    href={organization.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 dark:text-teal-400 hover:underline flex items-center"
                  >
                    Visit Website
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetail;