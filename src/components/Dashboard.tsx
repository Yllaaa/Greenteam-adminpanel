import React, { FC, useState, useEffect } from 'react';
import { Box, H3, Text, Icon, Button } from '@adminjs/design-system';
import { ApiClient } from 'adminjs';

type ResourceCard = {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
};

type Stat = {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon?: string;
};

type ApiStatItem = {
  label: string;
  value: number;
  previousValue?: number;
  change?: number;
};

type ApiStatsResponse = {
  users: ApiStatItem;
  posts: ApiStatItem;
  reports: ApiStatItem;
  challenges: ApiStatItem;
  timeLabel: string;
};

type TimePeriod = 'daily' | 'weekly' | 'monthly';

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.greenteam.app/api/v1';

const Dashboard: FC = () => {
  const api = new ApiClient();
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('daily');
  const [stats, setStats] = useState<Stat[]>([]);
  const [timeLabel, setTimeLabel] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const formatChange = (change: number | undefined): { text: string; positive: boolean } => {
    if (change === undefined || isNaN(change)) {
      return { text: 'New', positive: true };
    }

    const positive = change >= 0;
    return {
      text: `${positive ? '+' : ''}${change.toFixed(0)}%`,
      positive,
    };
  };

  const mapApiStatsToFrontend = (apiResponse: ApiStatsResponse): Stat[] => {
    const statsArray: Stat[] = [
      {
        label: 'New Users',
        value: formatNumber(apiResponse.users.value),
        change: formatChange(apiResponse.users.change).text,
        positive: formatChange(apiResponse.users.change).positive,
        icon: 'User',
      },
      {
        label: 'New Posts',
        value: formatNumber(apiResponse.posts.value),
        change: formatChange(apiResponse.posts.change).text,
        positive: formatChange(apiResponse.posts.change).positive,
        icon: 'Image',
      },
      {
        label: 'New Reports',
        value: formatNumber(apiResponse.reports.value),
        change: formatChange(apiResponse.reports.change).text,
        positive: !formatChange(apiResponse.reports.change).positive,
        icon: 'Danger',
      },
      {
        label: 'Completed Challenges',
        value: formatNumber(apiResponse.challenges.value),
        change: formatChange(apiResponse.challenges.change).text,
        positive: formatChange(apiResponse.challenges.change).positive,
        icon: 'Award',
      },
    ];

    return statsArray;
  };

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/dashboard/stats?period=${timePeriod}`);
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }

        const apiData: ApiStatsResponse = await response.json();
        setTimeLabel(apiData.timeLabel);

        const formattedStats = mapApiStatsToFrontend(apiData);
        setStats(formattedStats);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats([]);
        setTimeLabel('Current Stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [timePeriod]);

  const resources: ResourceCard[] = [
    {
      id: 'Users_accounts',
      title: 'Users',
      description: 'Manage user accounts, roles and permissions',
      icon: 'User',
      iconColor: 'blue',
    },
    {
      id: 'posts',
      title: 'Posts',
      description: 'Review and moderate content posted by users',
      icon: 'Image',
      iconColor: 'aqua',
    },
    {
      id: 'green_challenges',
      title: 'Challenges',
      description: 'Create and manage sustainability challenges',
      icon: 'Award',
      iconColor: 'green',
    },
    {
      id: 'user_reports',
      title: 'Reports',
      description: 'View analytics and generate reports',
      icon: 'ChartBar',
      iconColor: 'purple',
    },
    {
      id: 'users_subscriptions',
      title: 'Subscriptions',
      description: 'Manage user subscriptions and payment plans',
      icon: 'CreditCard',
      iconColor: 'red',
    },
  ];

  const handleResourceClick = (resourceId: string) => {
    window.location.href = `/admin/resources/${resourceId}`;
  };

  const handleTimePeriodChange = (period: TimePeriod) => {
    setTimePeriod(period);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" width="100%" bg="ghostBg">
      <Box flex="1">
        {/* Welcome Banner */}
        <Box
          p="xl"
          borderRadius="lg"
          mb="xl"
          style={{
            background: 'linear-gradient(135deg, #0B321F 0%, #1D653B 50%, #74B243 100%)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
          width="100%"
        >
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <H3 mb="sm" style={{ color: 'white', fontWeight: 'bold' }}>
                Greenteam Admin Dashboard
              </H3>
              <Text style={{ color: '#E0F0E8' }}>Your sustainable social platform management hub</Text>
            </Box>
            <img
              src="https://greenteam-bucket-2025.s3.us-east-2.amazonaws.com/admin-panel-assets/Frame+1618872786.png"
              alt="Greenteam Logo"
              style={{ height: '90px', marginLeft: '40px' }}
            />
          </Box>
        </Box>

        {/* Body Content */}
        <Box px="xl" width="100%">
          {/* Stats Overview */}
          <Box mb="xl">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="lg">
              <H3>{timeLabel || 'Current Stats'}</H3>
              <Box display="flex" alignItems="center">
                <Text mr="md">Time period:</Text>
                <Box
                  display="flex"
                  bg="white"
                  borderRadius="default"
                  style={{ overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
                >
                  <Button
                    size="sm"
                    onClick={() => handleTimePeriodChange('daily')}
                    style={{
                      backgroundColor: timePeriod === 'daily' ? '#0B321F' : 'white',
                      color: timePeriod === 'daily' ? 'white' : '#0B321F',
                      borderRadius: 0,
                      padding: '8px 16px',
                    }}
                  >
                    Daily
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleTimePeriodChange('weekly')}
                    style={{
                      backgroundColor: timePeriod === 'weekly' ? '#0B321F' : 'white',
                      color: timePeriod === 'weekly' ? 'white' : '#0B321F',
                      borderRadius: 0,
                      padding: '8px 16px',
                    }}
                  >
                    Weekly
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleTimePeriodChange('monthly')}
                    style={{
                      backgroundColor: timePeriod === 'monthly' ? '#0B321F' : 'white',
                      color: timePeriod === 'monthly' ? 'white' : '#0B321F',
                      borderRadius: 0,
                      padding: '8px 16px',
                    }}
                  >
                    Monthly
                  </Button>
                </Box>
              </Box>
            </Box>

            <Box flex flexDirection="row" flexWrap="wrap" mx="-md">
              {loading ? (
                <Box width="100%" textAlign="center" py="xl">
                  <Text>Loading stats...</Text>
                </Box>
              ) : (
                stats.map((stat, index) => (
                  <Box key={index} width={[1, 1 / 2, 1 / 4]} px="md" mb="lg">
                    <Box
                      bg="white"
                      p="lg"
                      borderRadius="lg"
                      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'transform 0.2s ease-in-out' }}
                      hover={{ transform: 'translateY(-4px)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    >
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb="sm">
                        <Text color="grey60" fontWeight="bold">
                          {stat.label}
                        </Text>
                        <Icon icon={stat.icon || 'Chart'} color={stat.positive ? 'green' : 'red'} size={20} />
                      </Box>
                      <Text fontWeight="bold" fontSize="xl" mb="xs">
                        {stat.value}
                      </Text>
                      {stat.change && (
                        <Box display="flex" alignItems="center">
                          <Icon
                            icon={stat.positive ? 'ArrowUp' : 'ArrowDown'}
                            color={stat.positive ? 'green' : 'red'}
                            size={16}
                            mr="xs"
                          />
                          <Text fontWeight="bold" color={stat.positive ? 'green' : 'red'} fontSize="sm">
                            {stat.change}
                          </Text>
                        </Box>
                      )}
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          </Box>

          {/* Quick Access Resources */}
          <Box mb="xl">
            <H3 mb="lg">Quick Access</H3>
            <Box flex flexDirection="row" flexWrap="wrap" mx="-md">
              {resources.map((resource) => (
                <Box key={resource.id} width={[1, 1 / 2, 1 / 3]} px="md" mb="lg">
                  <Box
                    onClick={() => handleResourceClick(resource.id)}
                    bg="white"
                    p="lg"
                    borderRadius="lg"
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      borderLeft: `4px solid ${resource.iconColor}`,
                    }}
                    hover={{ transform: 'translateY(-4px)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  >
                    <Box flex flexDirection="row" alignItems="center" mb="md">
                      <Box
                        mr="md"
                        p="sm"
                        borderRadius="default"
                        bg={`${resource.iconColor}10`}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Icon icon={resource.icon} color={resource.iconColor} size={24} />
                      </Box>
                      <Text fontWeight="bold">{resource.title}</Text>
                    </Box>
                    <Text fontSize="sm" color="grey60">
                      {resource.description}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box bg="white" p="sm" textAlign="center" borderTop="1px solid" borderColor="separator" mt="auto">
          <Text fontSize="sm" color="grey60">
            Greenteam Admin Panel © 2025 | All rights reserved
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
