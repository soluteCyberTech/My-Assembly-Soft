import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
  Stack,
  Fade,
  Zoom,
  styled,
  Divider
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyIcon from '@mui/icons-material/Key';
import axios from 'axios';
import Swal from 'sweetalert2';

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

const SummaryBox = styled(Box)(({ theme }) => ({
  background: 'rgba(0, 0, 0, 0.02)',
  borderRadius: '8px',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3)
}));

function FinalSetup({ onComplete, data, allFormData, registerValidation }) {
  const [formData, setFormData] = useState({
    activationKey: data?.activationKey || '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [activationCode, setActivationCode] = useState('');
  const [activationId, setActivationId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(res => {
        if (res.data && res.data[0]) {
          setActivationCode(res.data[0].activation_code);
          setActivationId(res.data[0].trans_code);
        }
      })
      .catch(err => {
        setErrors({ api: 'Failed to fetch activation code' });
      });
  }, []);

  const validateForm = async () => {
    const newErrors = {};
    
    if (!formData.activationKey) {
      newErrors.activationKey = 'Activation key is required';
    } else if (formData.activationKey !== activationCode) {
      newErrors.activationKey = 'Invalid activation key';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const result = await Swal.fire({
          title: 'Save Data?',
          text: 'Activate Assembly Account?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes Activate'
        });

        if (result.isConfirmed) {
          setLoading(true);
          Swal.fire({
            title: 'Saving Data',
            html: 'processing please wait......',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

          const userInformation = [
            {
              name: allFormData.head.name,
              email: allFormData.head.email,
              department: 'Head Of Assembly',
              role: 'Head Of Assembly',
              StaffId: allFormData.head.staffId,
              username: allFormData.head.username,
              Password: String(allFormData.head.password)
            },
            {
              name: allFormData.admin.name,
              email: allFormData.admin.email,
              department: 'System Administrator',
              role: 'System Administrator',
              StaffId: allFormData.admin.staffId,
              username: allFormData.admin.username,
              Password: String(allFormData.admin.password)
            }
          ];

          await axios.post('http://localhost:5000/createstaff', {
            data: userInformation,
            assname: allFormData.assembly.assname,
            mmda: allFormData.assembly.mmda,
            regions: allFormData.assembly.regions,
            location: allFormData.assembly.location,
            digitaladd: allFormData.assembly.digitaladd,
            email: allFormData.assembly.email,
            Phone: allFormData.assembly.phone,
            companylogo: allFormData.assembly.companylogo,
            state: 1,
            ActivationId: activationId
          });

          await Swal.fire('Success', 'Data successfully saved', 'success');
          window.location.reload();
          return true;
        }
      } catch (error) {
        console.error(error);
        setErrors({ submit: 'Failed to complete setup. Please try again.' });
        await Swal.fire('Error', 'Failed to save data. Please try again.', 'error');
        return false;
      } finally {
        setLoading(false);
      }
    }
    return false;
  };

  useEffect(() => {
    registerValidation(validateForm);
  }, [formData, activationCode, activationId]);

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
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1
                }}
              >
                <KeyIcon /> Activation & Final Setup
              </Typography>
            </Zoom>

            <Alert 
              severity="info" 
              sx={{ 
                mb: 4, 
                borderRadius: '8px',
                '& .MuiAlert-icon': {
                  fontSize: '24px'
                }
              }}
            >
              Please review the information and enter your activation key to complete the setup
            </Alert>

            <SummaryBox>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  mb: 2,
                  color: 'text.secondary',
                  fontWeight: 500 
                }}
              >
                Setup Summary
              </Typography>
              
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Assembly Name
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {allFormData?.assembly?.assname}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 1 }} />
                
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Head of Assembly
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {allFormData?.head?.name}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 1 }} />
                
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    System Administrator
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {allFormData?.admin?.name}
                  </Typography>
                </Box>
              </Stack>
            </SummaryBox>

            <StyledTextField
              fullWidth
              label="Activation Key"
              value={formData.activationKey}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                activationKey: e.target.value 
              }))}
              error={!!errors.activationKey}
              helperText={errors.activationKey}
              sx={{ mb: 3 }}
            />

            {errors.api && (
              <Alert 
                severity="error"
                sx={{ 
                  mb: 2,
                  borderRadius: '8px'
                }}
              >
                {errors.api}
              </Alert>
            )}

            {errors.submit && (
              <Alert 
                severity="error"
                sx={{ 
                  mb: 2,
                  borderRadius: '8px'
                }}
              >
                {errors.submit}
              </Alert>
            )}

            <Fade in timeout={400}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={validateForm}
                disabled={loading}
                sx={{ 
                  borderRadius: '8px',
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease',
                  '&:not(:disabled):hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                  }
                }}
              >
                {loading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={20} color="inherit" />
                    <span>Activating...</span>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon />
                    <span>Complete Setup</span>
                  </Box>
                )}
              </Button>
            </Fade>
          </CardContent>
        </StyledCard>
      </Fade>
    </Box>
  );
}

export default FinalSetup;