import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  styled,
  Alert,
  Fade,
  Zoom,
  Divider,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Link
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  LockOutlined,
  PersonOutline,
  Security,
  CheckCircleOutline
} from '@mui/icons-material';
import axios from 'axios';

const LoginWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)',
  padding: theme.spacing(2),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url(/pattern.png) repeat',
    opacity: 0.03,
  }
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 450,
  borderRadius: 16,
  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
  overflow: 'visible',
  position: 'relative',
  background: '#ffffff',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: 'linear-gradient(45deg, #2E7D32, #4CAF50)',
    borderRadius: 18,
    zIndex: -1,
    opacity: 0.2,
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: '#ffffff',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    }
  }
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 100,
  height: 100,
  margin: '-50px auto 20px',
  backgroundColor: '#ffffff',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  border: '6px solid white',
  '& .MuiSvgIcon-root': {
    fontSize: 45,
    color: theme.palette.primary.main,
  }
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
  '&:hover': {
    backgroundColor: 'rgba(46, 125, 50, 0.04)',
  }
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 500,
  transition: 'all 0.2s',
  '&:hover': {
    color: theme.palette.primary.dark,
    textDecoration: 'none',
  }
}));

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
      setFormData(prev => ({ ...prev, username: savedUsername }));
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: formData.username,
        password: formData.password
      });

      if (response.data.success) {
        setSuccess(true);
        
        // Store user data in localStorage
        const userData = {
          name: response.data.user.name,
          email: response.data.user.emain, // Note: backend uses 'emain' for email
          department: response.data.user.department,
          role: response.data.user.role,
          staff_id: response.data.user.staff_id
        };
        
        localStorage.setItem('userInfo', JSON.stringify(userData));
        
        if (rememberMe) {
          localStorage.setItem('rememberedUsername', formData.username);
        }

        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid username or password');
      setLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    
    alert('forgot pass');
  };

  return (
    <LoginWrapper>
      <Fade in timeout={1000}>
        <StyledCard>
          <CardContent sx={{ p: 4 }}>
            <LogoContainer>
              <Security />
            </LogoContainer>

            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography 
                variant="h4" 
                gutterBottom
                sx={{ 
                  fontWeight: 600,
                  color: 'primary.main',
                  letterSpacing: 0.5,
                }}
              >
                Assembly Management
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: '0.95rem' }}
              >
                Welcome back! Please login to your account.
              </Typography>
            </Box>

            {success ? (
              <Fade in>
                <Alert 
                  icon={<CheckCircleOutline fontSize="inherit" />}
                  severity="success" 
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    '& .MuiAlert-icon': {
                      fontSize: 24
                    }
                  }}
                >
                  Login successful! Redirecting...
                </Alert>
              </Fade>
            ) : error && (
              <Fade in>
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    '& .MuiAlert-icon': {
                      fontSize: 24
                    }
                  }}
                >
                  {error}
                </Alert>
              </Fade>
            )}

            <form onSubmit={handleSubmit}>
              <StyledTextField
                fullWidth
                label="Username"
                variant="outlined"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <StyledTextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3 
              }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      size="small"
                      sx={{
                        color: 'primary.main',
                        '&.Mui-checked': {
                          color: 'primary.main',
                        }
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" color="text.secondary">
                      Remember me
                    </Typography>
                  }
                />
                <Link
                  href="#"
                  onClick={handleForgotPassword}
                  variant="body2"
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading || success}
                sx={{
                  py: 1.8,
                  mb: 3,
                  fontSize: '1.1rem',
                  borderRadius: 2,
                  textTransform: 'none',
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 8px 20px rgba(46, 125, 50, 0.25)',
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Sign In'
                )}
              </Button>

              <Typography 
                variant="body2" 
                color="text.secondary" 
                align="center"
                sx={{ 
                  fontWeight: 500,
                  letterSpacing: 0.5
                }}
              >
                Powered by Solute Cyber Technology
              </Typography>
            </form>
          </CardContent>
        </StyledCard>
      </Fade>
    </LoginWrapper>
  );
}

export default Login;
