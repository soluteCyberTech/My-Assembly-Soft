import React, { useState } from 'react';
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
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function AdminSetup({ onNext, data, registerValidation }) {
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

  const handleSubmit = () => {
    if (validateForm()) {
      onNext(formData);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Card elevation={0}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            System Administrator Details
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            This account will have full system administration privileges
          </Alert>

          <TextField
            fullWidth
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            error={!!errors.name}
            helperText={errors.name}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Staff ID"
            value={formData.staffId}
            onChange={(e) => setFormData(prev => ({ ...prev, staffId: e.target.value }))}
            error={!!errors.staffId}
            helperText={errors.staffId}
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.gender}
              onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
              error={!!errors.gender}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            error={!!errors.phone}
            helperText={errors.phone}
            margin="normal"
            type="number"
          />

          <TextField
            fullWidth
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
            type="email"
          />

          <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>
            Administrator Account Credentials
          </Typography>

          <TextField
            fullWidth
            label="Username"
            value={formData.username}
            onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
            error={!!errors.username}
            helperText={errors.username}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            error={!!errors.password}
            helperText={errors.password}
            margin="normal"
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

          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            margin="normal"
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

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{ mt: 3 }}
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AdminSetup;