import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useCampaigns } from '../context/CampaignContext';
import CampaignCard from '../components/campaigns/CampaignCard';
import OrganizationCard from '../components/campaigns/OrganizationCard';
import { Search, Heart, Users, Award, ArrowRight } from 'lucide-react';
import { mockOrganizations, mockCauses } from '../data/mockData';

const Home = () => {
  const { user } = useUser();
  const { filteredCampaigns } = useCampaigns();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCause, setSelectedCause] = useState('');
  
  const featuredCampaigns = filteredCampaigns
    .filter(campaign => campaign.status === 'active' && campaign.urgencyLevel === 'high')
    .slice(0, 3);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would navigate to a search results page
      window.location.href = `/campaigns?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  if (!user) {
    return (
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-blue-500 text-white">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Connect with Causes That Matter to You
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Join our platform to discover meaningful volunteer opportunities and connect with organizations making a difference in your community and beyond.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/register" 
                  className="px-6 py-3 rounded-md bg-white text-teal-700 font-medium hover:bg-gray-100 transition duration-300 text-center"
                >
                  Get Started
                </Link>
                <Link 
                  to="/campaigns" 
                  className="px-6 py-3 rounded-md border border-white bg-transparent font-medium hover:bg-white/10 transition duration-300 text-center"
                >
                  Browse Campaigns
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-4">
              <div className="relative rounded-lg overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105">
                <img 
                  src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Volunteers working together" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Search Section */}
        <section className="relative -mt-8 sm:-mt-12 max-w-4xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-4 text-center">Find Volunteer Opportunities</h2>
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input 
                  type="text"
                  placeholder="Search for campaigns, causes, or organizations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 px-4 py-3 bg-teal-600 text-white rounded-r-md hover:bg-teal-700 transition duration-300"
                >
                  Search
                </button>
              </div>
            </form>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Popular causes:</span>
              {mockCauses.slice(0, 5).map(cause => (
                <button
                  key={cause}
                  onClick={() => setSelectedCause(selectedCause === cause ? '' : cause)}
                  className={`text-sm px-3 py-1 rounded-full border transition-colors duration-200 ${
                    selectedCause === cause
                      ? 'bg-teal-100 border-teal-500 text-teal-800 dark:bg-teal-900/50 dark:border-teal-600 dark:text-teal-300'
                      : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {cause}
                </button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our platform connects passionate volunteers with organizations making a difference.
                Here's how you can get involved.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-14 h-14 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center mb-6 text-teal-600 dark:text-teal-400">
                  <Search size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Discover Opportunities</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Search through hundreds of volunteer opportunities based on your interests, skills, and availability.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-14 h-14 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center mb-6 text-teal-600 dark:text-teal-400">
                  <Users size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Connect & Apply</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Apply to campaigns that match your profile, and communicate directly with organizations.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-14 h-14 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center mb-6 text-teal-600 dark:text-teal-400">
                  <Award size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Make an Impact</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Contribute your time and skills to causes you care about, and track your positive impact over time.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Campaigns */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Urgent Campaigns</h2>
              <Link to="/campaigns" className="text-teal-600 dark:text-teal-400 hover:underline flex items-center">
                View all <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCampaigns.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Organizations */}
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Featured Organizations</h2>
              <Link to="/organizations" className="text-teal-600 dark:text-teal-400 hover:underline flex items-center">
                View all <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockOrganizations.slice(0, 3).map(organization => (
                <OrganizationCard key={organization.id} organization={organization} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-teal-600 to-blue-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Volunteer Success Stories</h2>
              <p className="text-lg max-w-3xl mx-auto opacity-90">
                Hear from volunteers and organizations who have connected through our platform and made a difference together.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Michael K." 
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Michael K.</h4>
                    <p className="text-sm opacity-80">Volunteer</p>
                  </div>
                </div>
                <p className="italic">
                  "Through this platform, I found the perfect opportunity to teach coding to underprivileged kids. It's been incredibly rewarding to see them grow and develop new skills."
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Jessica T." 
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Jessica T.</h4>
                    <p className="text-sm opacity-80">Program Director</p>
                  </div>
                </div>
                <p className="italic">
                  "As a small nonprofit, finding dedicated volunteers used to be challenging. Now we can quickly connect with skilled individuals who share our mission and values."
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="David L." 
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">David L.</h4>
                    <p className="text-sm opacity-80">Volunteer</p>
                  </div>
                </div>
                <p className="italic">
                  "I've participated in three environmental cleanup campaigns through this platform. It's been easy to find opportunities that fit my schedule and connect with like-minded people."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Join our community today and start your volunteering journey. Whether you're an individual looking to help or an organization in need of volunteers, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/register"
                className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition duration-300"
              >
                Sign Up Now
              </Link>
              <Link
                to="/campaigns"
                className="px-8 py-3 border border-teal-600 dark:border-teal-500 text-teal-600 dark:text-teal-400 font-medium rounded-md hover:bg-teal-50 dark:hover:bg-teal-900/20 transition duration-300"
              >
                Explore Campaigns
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Logged-in user view
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Welcome Back Section */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-teal-600 to-blue-500 rounded-xl p-6 md:p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
              <p className="text-white/90">
                {user.userType === 'volunteer' 
                  ? "Ready to find your next volunteering opportunity?"
                  : "Ready to find passionate volunteers for your causes?"}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Link
                to={user.userType === 'volunteer' ? "/campaigns" : "/campaigns/create"}
                className="inline-block px-6 py-3 bg-white text-teal-700 rounded-md font-medium hover:bg-gray-100 transition duration-300"
              >
                {user.userType === 'volunteer' ? "Find Campaigns" : "Create Campaign"}
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2 space-y-8">
          {user.userType === 'volunteer' ? (
            <>
              {/* Recommended Campaigns */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recommended For You</h2>
                  <Link to="/campaigns" className="text-sm text-teal-600 dark:text-teal-400 hover:underline flex items-center">
                    View all <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {filteredCampaigns.slice(0, 4).map(campaign => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                  ))}
                </div>
              </section>
              
              {/* My Applications */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">My Applications</h2>
                  <Link to="/profile/applications" className="text-sm text-teal-600 dark:text-teal-400 hover:underline flex items-center">
                    View all <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                  {filteredCampaigns
                    .filter(campaign => campaign.applicants.includes(user.id))
                    .slice(0, 3)
                    .map(campaign => (
                      <CampaignCard key={campaign.id} campaign={campaign} compact />
                    ))}
                  
                  {filteredCampaigns.filter(campaign => campaign.applicants.includes(user.id)).length === 0 && (
                    <div className="text-center py-8">
                      <Heart size={40} className="mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-500 dark:text-gray-400">You haven't applied to any campaigns yet.</p>
                      <Link to="/campaigns" className="inline-block mt-2 text-teal-600 dark:text-teal-400 hover:underline">
                        Browse campaigns
                      </Link>
                    </div>
                  )}
                </div>
              </section>
            </>
          ) : (
            <>
              {/* Organization's Campaigns */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Your Active Campaigns</h2>
                  <Link to="/campaigns/manage" className="text-sm text-teal-600 dark:text-teal-400 hover:underline flex items-center">
                    Manage all <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {filteredCampaigns
                    .filter(campaign => campaign.organizationId === user.id && campaign.status === 'active')
                    .slice(0, 2)
                    .map(campaign => (
                      <CampaignCard key={campaign.id} campaign={campaign} />
                    ))}
                  
                  {filteredCampaigns.filter(campaign => campaign.organizationId === user.id && campaign.status === 'active').length === 0 && (
                    <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                      <Heart size={40} className="mx-auto mb-3 text-gray-400" />
                      <p className="text-gray-500 dark:text-gray-400 mb-4">You don't have any active campaigns.</p>
                      <Link
                        to="/campaigns/create"
                        className="inline-block px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition duration-300"
                      >
                        Create New Campaign
                      </Link>
                    </div>
                  )}
                </div>
              </section>
              
              {/* Recent Applications */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recent Applications</h2>
                  <Link to="/volunteers/applications" className="text-sm text-teal-600 dark:text-teal-400 hover:underline flex items-center">
                    View all <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                  {filteredCampaigns
                    .filter(campaign => campaign.organizationId === user.id && campaign.applicants.length > 0)
                    .slice(0, 1)
                    .map(campaign => (
                      <div key={campaign.id} className="mb-4 last:mb-0">
                        <h3 className="font-medium mb-2">{campaign.title}</h3>
                        <div className="space-y-2">
                          {campaign.applicants.slice(0, 3).map((applicantId) => (
                            <div key={applicantId} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-800 flex items-center justify-center text-teal-600 dark:text-teal-300 font-medium mr-3">
                                  {applicantId.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <p className="font-medium">{applicantId}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Applied recently</p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button className="text-sm px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition duration-200">
                                  Accept
                                </button>
                                <button className="text-sm px-3 py-1 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition duration-200">
                                  View
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  
                  {filteredCampaigns.filter(campaign => campaign.organizationId === user.id && campaign.applicants.length > 0).length === 0 && (
                    <div className="text-center py-8">
                      <Users size={40} className="mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-500 dark:text-gray-400">No applications to review at this time.</p>
                      <Link to="/campaigns/create" className="inline-block mt-2 text-teal-600 dark:text-teal-400 hover:underline">
                        Create a new campaign
                      </Link>
                    </div>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
        
        {/* Right Column */}
        <div className="space-y-8">
          {/* Profile Summary */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-800 flex items-center justify-center text-teal-600 dark:text-teal-300 font-bold text-xl overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 capitalize">{user.userType}</p>
              </div>
            </div>
            
            <div className="border-t dark:border-gray-700 pt-4 mt-2">
              <div className="grid grid-cols-2 gap-4 text-center">
                {user.userType === 'volunteer' ? (
                  <>
                    <div>
                      <p className="text-xl font-semibold text-teal-600 dark:text-teal-400">{user.stats?.campaignsJoined || 0}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Campaigns</p>
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-teal-600 dark:text-teal-400">{user.stats?.hoursContributed || 0}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Hours</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-xl font-semibold text-teal-600 dark:text-teal-400">{user.stats?.campaignsCreated || 0}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Campaigns</p>
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-teal-600 dark:text-teal-400">{user.stats?.volunteersHelped || 0}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Volunteers</p>
                    </div>
                  </>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t dark:border-gray-700">
                <Link
                  to="/profile"
                  className="block w-full text-center px-4 py-2 border border-teal-600 dark:border-teal-500 text-teal-600 dark:text-teal-400 rounded-md hover:bg-teal-50 dark:hover:bg-teal-900/20 transition duration-300"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </section>
          
          {/* Quick Links */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <h3 className="font-semibold px-6 pt-5 pb-3">Quick Links</h3>
            <div className="divide-y dark:divide-gray-700">
              <Link 
                to={user.userType === 'volunteer' ? "/impact" : "/dashboard"} 
                className="flex items-center px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
              >
                <Award size={18} className="text-teal-600 dark:text-teal-400 mr-3" />
                <span>{user.userType === 'volunteer' ? "My Impact" : "Dashboard"}</span>
              </Link>
              
              <Link 
                to="/messages" 
                className="flex items-center px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
              >
                <MessageSquare size={18} className="text-teal-600 dark:text-teal-400 mr-3" />
                <span>Messages</span>
              </Link>
              
              <Link 
                to={user.userType === 'volunteer' ? "/campaigns" : "/campaigns/create"} 
                className="flex items-center px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
              >
                <Heart size={18} className="text-teal-600 dark:text-teal-400 mr-3" />
                <span>{user.userType === 'volunteer' ? "Find Campaigns" : "Create Campaign"}</span>
              </Link>
            </div>
          </section>
          
          {/* Featured Section */}
          {user.userType === 'volunteer' ? (
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-4">Featured Organizations</h3>
              <div className="space-y-4">
                {mockOrganizations.slice(0, 3).map(org => (
                  <OrganizationCard key={org.id} organization={org} compact />
                ))}
              </div>
            </section>
          ) : (
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-4">Tips for Success</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex">
                  <span className="text-teal-600 dark:text-teal-400 mr-2">•</span>
                  <span>Clearly define volunteer roles and responsibilities</span>
                </li>
                <li className="flex">
                  <span className="text-teal-600 dark:text-teal-400 mr-2">•</span>
                  <span>Respond to applications within 48 hours</span>
                </li>
                <li className="flex">
                  <span className="text-teal-600 dark:text-teal-400 mr-2">•</span>
                  <span>Add photos to your campaigns for 50% more visibility</span>
                </li>
                <li className="flex">
                  <span className="text-teal-600 dark:text-teal-400 mr-2">•</span>
                  <span>Keep volunteer communications in one place</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t dark:border-gray-700">
                <Link
                  to="/resources/organizations"
                  className="text-sm text-teal-600 dark:text-teal-400 hover:underline"
                >
                  View all resources →
                </Link>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;