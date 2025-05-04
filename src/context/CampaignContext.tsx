import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Campaign, Filter } from '../types';
import { mockCampaigns } from '../data/mockData';

interface CampaignContextType {
  campaigns: Campaign[];
  isLoading: boolean;
  filter: Filter;
  filteredCampaigns: Campaign[];
  setFilter: (filter: Filter) => void;
  getCampaign: (id: string) => Campaign | undefined;
  applyCampaign: (campaignId: string, userId: string) => Promise<boolean>;
  createCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt' | 'applicants' | 'volunteers'>) => Promise<Campaign>;
  updateCampaign: (id: string, data: Partial<Campaign>) => Promise<boolean>;
  deleteCampaign: (id: string) => Promise<boolean>;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<Filter>({});

  useEffect(() => {
    // Simulate fetching campaigns
    const fetchCampaigns = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setCampaigns(mockCampaigns);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let result = [...campaigns];

      // Search filter
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        result = result.filter(camp => 
          camp.title.toLowerCase().includes(searchLower) || 
          camp.description.toLowerCase().includes(searchLower) ||
          camp.location.toLowerCase().includes(searchLower)
        );
      }

      // Causes filter
      if (filter.causes && filter.causes.length > 0) {
        result = result.filter(camp => 
          camp.causes.some(cause => filter.causes?.includes(cause))
        );
      }

      // Skills filter
      if (filter.skills && filter.skills.length > 0) {
        result = result.filter(camp => 
          camp.skills.some(skill => filter.skills?.includes(skill))
        );
      }

      // Location filter
      if (filter.location) {
        result = result.filter(camp => 
          camp.location.toLowerCase().includes(filter.location!.toLowerCase())
        );
      }

      // Remote filter
      if (filter.remote !== undefined) {
        result = result.filter(camp => camp.isRemote === filter.remote);
      }

      // Status filter
      if (filter.status && filter.status.length > 0) {
        result = result.filter(camp => filter.status?.includes(camp.status));
      }

      // Urgency filter
      if (filter.urgency && filter.urgency.length > 0) {
        result = result.filter(camp => 
          camp.urgencyLevel && filter.urgency?.includes(camp.urgencyLevel)
        );
      }

      // Duration filter
      if (filter.duration) {
        const [min, max] = filter.duration;
        result = result.filter(camp => 
          camp.requiredHours >= min && camp.requiredHours <= max
        );
      }

      // Sort
      if (filter.sortBy) {
        switch (filter.sortBy) {
          case 'newest':
            result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
          case 'popularity':
            result.sort((a, b) => (b.applicants.length + b.volunteers.length) - (a.applicants.length + a.volunteers.length));
            break;
          case 'urgency':
            const urgencyValue = (level?: string) => {
              if (level === 'high') return 3;
              if (level === 'medium') return 2;
              if (level === 'low') return 1;
              return 0;
            };
            result.sort((a, b) => urgencyValue(b.urgencyLevel) - urgencyValue(a.urgencyLevel));
            break;
          case 'endingSoon':
            result.sort((a, b) => {
              if (!a.endDate) return 1;
              if (!b.endDate) return -1;
              return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
            });
            break;
        }
      }

      setFilteredCampaigns(result);
    };

    applyFilters();
  }, [campaigns, filter]);

  const getCampaign = (id: string) => {
    return campaigns.find(campaign => campaign.id === id);
  };

  const applyCampaign = async (campaignId: string, userId: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedCampaigns = campaigns.map(campaign => {
        if (campaign.id === campaignId && !campaign.applicants.includes(userId)) {
          return {
            ...campaign,
            applicants: [...campaign.applicants, userId],
            updatedAt: new Date().toISOString()
          };
        }
        return campaign;
      });
      
      setCampaigns(updatedCampaigns);
      return true;
    } catch (error) {
      console.error('Error applying to campaign:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const createCampaign = async (campaignData: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt' | 'applicants' | 'volunteers'>): Promise<Campaign> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const now = new Date().toISOString();
      const newCampaign: Campaign = {
        ...campaignData,
        id: `campaign-${Date.now()}`,
        createdAt: now,
        updatedAt: now,
        applicants: [],
        volunteers: []
      };
      
      setCampaigns([...campaigns, newCampaign]);
      return newCampaign;
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw new Error('Failed to create campaign');
    } finally {
      setIsLoading(false);
    }
  };

  const updateCampaign = async (id: string, data: Partial<Campaign>): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedCampaigns = campaigns.map(campaign => {
        if (campaign.id === id) {
          return {
            ...campaign,
            ...data,
            updatedAt: new Date().toISOString()
          };
        }
        return campaign;
      });
      
      setCampaigns(updatedCampaigns);
      return true;
    } catch (error) {
      console.error('Error updating campaign:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCampaign = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setCampaigns(campaigns.filter(campaign => campaign.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting campaign:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CampaignContext.Provider value={{
      campaigns,
      isLoading,
      filter,
      filteredCampaigns,
      setFilter,
      getCampaign,
      applyCampaign,
      createCampaign,
      updateCampaign,
      deleteCampaign
    }}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaigns = (): CampaignContextType => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaigns must be used within a CampaignProvider');
  }
  return context;
};