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
  Alert,
  Fade,
  Zoom,
  styled
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageUploading from 'react-images-uploading';
import { resizeFile } from '../Message';

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

const StyledFormControl = styled(FormControl)(({ theme }) => ({
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

function AssemblyInfo({ onNext, data, registerValidation }) {
  const [formData, setFormData] = useState({
    assname: data.assname || '',
    mmda: data.mmda || '',
    regions: data.regions || '',
    location: data.location || '',
    digitaladd: data.digitaladd || '',
    email: data.email || '',
    phone: data.phone || '',
    companylogo: data.companylogo || ''
  });

  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.assname || formData.assname.length < 4) {
      newErrors.assname = 'Assembly name must be at least 4 characters';
    }
    if (!formData.mmda) {
      newErrors.mmda = 'MMDA type is required';
    }
    if (!formData.regions) {
      newErrors.regions = 'Region is required';
    }
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }
    if (!formData.digitaladd) {
      newErrors.digitaladd = 'Digital address is required';
    }
    if (!formData.email.match('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$')) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.match('^[0-9]{10}$')) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onNext(formData);
      return true;
    }
    return false;
  };

  useEffect(() => {
    registerValidation(validateForm);
  }, [formData]);

  const handleImageChange = async (imageList) => {
    setImages(imageList);
    if (imageList.length > 0) {
      const image = await resizeFile(imageList[0].file);
      setFormData(prev => ({
        ...prev,
        companylogo: image
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        companylogo: ''
      }));
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
                Assembly Information
              </Typography>
            </Zoom>

            <StyledTextField
              fullWidth
              label="Assembly Name"
              value={formData.assname}
              onChange={(e) => setFormData(prev => ({ ...prev, assname: e.target.value }))}
              error={!!errors.assname}
              helperText={errors.assname}
              sx={{ mb: 2 }}
            />

            <StyledFormControl fullWidth margin="normal">
              <InputLabel>MMDA Type</InputLabel>
              <Select
                value={formData.mmda}
                onChange={(e) => setFormData(prev => ({ ...prev, mmda: e.target.value }))}
                error={!!errors.mmda}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="District">District</MenuItem>
                <MenuItem value="Municipal">Municipal</MenuItem>
                <MenuItem value="Metropolitan">Metropolitan</MenuItem>
              </Select>
            </StyledFormControl>

            <StyledFormControl fullWidth margin="normal">
              <InputLabel>Region</InputLabel>
              <Select
                value={formData.regions}
                onChange={(e) => setFormData(prev => ({ ...prev, regions: e.target.value }))}
                error={!!errors.regions}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Ashanti Region">Ashanti Region</MenuItem>
                <MenuItem value="Brong Ahafo Region">Brong Ahafo Region</MenuItem>
                <MenuItem value="Central Region">Central Region</MenuItem>
                <MenuItem value="Eastern Region">Eastern Region</MenuItem>
                <MenuItem value="Greater Accra Region">Greater Accra Region</MenuItem>
                <MenuItem value="Northern Region">Northern Region</MenuItem>
                <MenuItem value="Upper East Region">Upper East Region</MenuItem>
                <MenuItem value="Upper West Region">Upper West Region</MenuItem>
                <MenuItem value="Volta Region">Volta Region</MenuItem>
                <MenuItem value="Western Region">Western Region</MenuItem>
                <MenuItem value="Savannah Region">Savannah Region</MenuItem>
                <MenuItem value="Bono East Region">Bono East Region</MenuItem>
                <MenuItem value="Oti Region">Oti Region</MenuItem>
                <MenuItem value="Ahafo Region">Ahafo Region</MenuItem>
                <MenuItem value="Western North Region">Western North Region</MenuItem>
                <MenuItem value="North East Region">North East Region</MenuItem>
              </Select>
            </StyledFormControl>

            <StyledTextField
              fullWidth
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              error={!!errors.location}
              helperText={errors.location}
              sx={{ mb: 2 }}
            />

            <StyledTextField
              fullWidth
              label="Digital Address"
              value={formData.digitaladd}
              onChange={(e) => setFormData(prev => ({ ...prev, digitaladd: e.target.value }))}
              error={!!errors.digitaladd}
              helperText={errors.digitaladd}
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

            <StyledTextField
              fullWidth
              label="Phone Contact"
              type="number"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              error={!!errors.phone}
              helperText={errors.phone}
              sx={{ mb: 2 }}
            />

            <ImageUploading
              value={images}
              onChange={handleImageChange}
              maxNumber={1}
              dataURLKey="data_url"
              acceptType={["jpg", "png"]}
            >
              {({
                imageList,
                onImageUpload,
                onImageRemove,
                isDragging,
                dragProps
              }) => (
                <Box sx={{ mt: 2 }}>
                  {imageList.length === 0 && (
                    <Button
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      fullWidth
                      onClick={onImageUpload}
                      {...dragProps}
                      sx={{ mt: 2 }}
                    >
                      Upload Assembly Logo
                    </Button>
                  )}
                  {imageList.map((image, index) => (
                    <Box key={index} sx={{ mt: 2, textAlign: 'center' }}>
                      <img src={image.data_url} alt="" width="150" />
                      <Box sx={{ mt: 1 }}>
                        <Button onClick={() => onImageUpload()}>Change</Button>
                        <Button onClick={() => onImageRemove(index)} color="error">
                          Remove
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </ImageUploading>
          </CardContent>
        </StyledCard>
      </Fade>
    </Box>
  );
}

export default AssemblyInfo;