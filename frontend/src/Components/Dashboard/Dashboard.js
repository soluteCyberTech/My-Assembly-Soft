import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Avatar,
  Card,
  CardContent,
  useTheme,
  Divider,
} from '@mui/material';
import {
  WatchLater,
  DateRange,
  Person,
  Email,
  Business,
  Badge,
} from '@mui/icons-material';

function Dashboard() {
  const theme = useTheme();
  const [userInfo, setUserInfo] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Section with Time */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          mb: 4, 
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar 
                sx={{ 
                  width: 90, 
                  height: 90, 
                  bgcolor: 'primary.main',
                  fontSize: '2.5rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                {userInfo?.name?.charAt(0)}
              </Avatar>
              <Box>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 1,
                  }}
                >
                  Welcome back,
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    color: 'primary.main',
                    fontWeight: 500,
                  }}
                >
                  {userInfo?.name}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  mt: 1 
                }}>
                  <DateRange sx={{ color: 'text.secondary' }} />
                  <Typography 
                    variant="subtitle1" 
                    sx={{ color: 'text.secondary' }}
                  >
                    {formatDate(currentTime)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <Card 
              sx={{ 
                bgcolor: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  justifyContent: 'center'
                }}>
                  <WatchLater 
                    sx={{ 
                      fontSize: 40,
                      color: 'primary.main'
                    }} 
                  />
                  <Box>
                    <Typography 
                      variant="h3" 
                      color="primary" 
                      sx={{ 
                        fontWeight: 600,
                        letterSpacing: 1,
                      }}
                    >
                      {formatTime(currentTime)}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      Current Time
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* User Information */}
      <Card 
        sx={{ 
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3, 
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            User Information
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.lighter' }}>
                  <Person sx={{ color: 'primary.main' }} />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Full Name
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {userInfo?.name}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.lighter' }}>
                  <Email sx={{ color: 'primary.main' }} />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Email Address
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {userInfo?.email}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.lighter' }}>
                  <Business sx={{ color: 'primary.main' }} />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Department
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {userInfo?.department}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.lighter' }}>
                  <Badge sx={{ color: 'primary.main' }} />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Staff ID
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {userInfo?.staff_id}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Dashboard; 