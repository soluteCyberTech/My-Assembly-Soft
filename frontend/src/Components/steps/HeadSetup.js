import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  Typography,
  InputAdornment,
  IconButton,
  Fade,
  Zoom,
  styled,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  background: '#fff',
  borderRadius: '12px',
  boxShadow: 'none',
  '& .MuiCardContent-root': {
    padding: theme.spacing(3)
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
    },
    '&.Mui-focused': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }
  }
}));

function HeadSetup({ onNext, data, registerValidation }) {
  const [formData, setFormData] = useState({
    name: data?.name || '',
    staffId: data?.staffId || '',
    gender: data?.gender || '',
    phone: data?.phone || '',
    email: data?.email || '',
    username: data?.username || '',
    password: data?.password || '',
    confirmPassword: data?.confirmPassword || ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.staffId) {
      newErrors.staffId = 'Staff ID is required';
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    if (!formData.phone.match('^[0-9]{10}$')) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.email.match('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$')) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password || typeof formData.password !== 'string') {
      newErrors.password = 'Password is required';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      const dataToSubmit = {
        ...formData,
        password: String(formData.password)
      };
      onNext(dataToSubmit);
      return true;
    }
    return false;
  };

  useEffect(() => {
    registerValidation(validateForm);
  }, [formData]);

  const handleSubmit = () => {
    if (validateForm()) {
      onNext(formData);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Fade in timeout={600}>
        <StyledCard>
          <CardContent>
            <Zoom in timeout={400}>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 500,
                  color: 'primary.main',
                  mb: 3,
                  textAlign: 'center'
                }}
              >
                Head of Assembly Details
              </Typography>
            </Zoom>

            <Alert 
              severity="info" 
              sx={{ 
                mb: 3, 
                borderRadius: '8px',
                '& .MuiAlert-icon': {
                  fontSize: '24px'
                }
              }}
            >
              Please provide the Head of Assembly's information
            </Alert>

            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  mb: 2, 
                  fontWeight: 500,
                  color: 'text.secondary'
                }}
              >
                Personal Information
              </Typography>
              
              <StyledTextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                error={!!errors.name}
                helperText={errors.name}
                sx={{ mb: 2 }}
              />

              <StyledTextField
                fullWidth
                label="Staff ID"
                value={formData.staffId}
                onChange={(e) => setFormData(prev => ({ ...prev, staffId: e.target.value }))}
                error={!!errors.staffId}
                helperText={errors.staffId}
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={formData.gender}
                  onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                  error={!!errors.gender}
                  sx={{ borderRadius: '8px' }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>

              <StyledTextField
                fullWidth
                label="Phone Number"
                type="number"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                error={!!errors.phone}
                helperText={errors.phone}
                sx={{ mb: 2 }}
              />

              <StyledTextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                error={!!errors.email}
                helperText={errors.email}
                sx={{ mb: 2 }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  mb: 2, 
                  fontWeight: 500,
                  color: 'text.secondary'
                }}
              >
                Account Credentials
              </Typography>

              <StyledTextField
                fullWidth
                label="Username"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                error={!!errors.username}
                helperText={errors.username}
                sx={{ mb: 2 }}
              />

              <StyledTextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                error={!!errors.password}
                helperText={errors.password}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <StyledTextField
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Fade in timeout={400}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                sx={{ 
                  borderRadius: '8px',
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                  }
                }}
              >
                Continue
              </Button>
            </Fade>
          </CardContent>
        </StyledCard>
      </Fade>
    </Box>
  );
}

export default HeadSetup;