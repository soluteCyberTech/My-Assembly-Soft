import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Container,
  Paper,
  Fade,
  Grow,
  Zoom,
  styled
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssemblyInfo from './steps/AssemblyInfo';
import HeadSetup from './steps/HeadSetup';
import AdminSetup from './steps/AdminSetup'; 
import FinalSetup from './steps/FinalSetup';


const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  height: 'calc(100vh - 10px)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden' 
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 4, 2),
  borderBottom: '1px solid rgba(0,0,0,0.08)',
  background: '#fff',
  position: 'sticky',
  top: 0,
  zIndex: 1,
}));

const ContentSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 4),
  overflowY: 'auto',
  flex: 1,
}));

const FooterSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 4),
  borderTop: '1px solid rgba(0,0,0,0.08)',
  background: '#fff',
  position: 'sticky',
  bottom: 0,
  zIndex: 1,
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(2)
}));

const StyledStepper = styled(Stepper)(({ theme }) => ({
  '.MuiStepLabel-root .Mui-completed': {
    color: theme.palette.success.main,
  },
  '.MuiStepLabel-label.Mui-completed': {
    color: theme.palette.success.main,
    fontWeight: 500,
  },
  '.MuiStepLabel-root .Mui-active': {
    color: theme.palette.primary.main,
  },
  '.MuiStepLabel-label.Mui-active': {
    fontWeight: 600,
  }
}));

function SetupSteps() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [formData, setFormData] = useState({
    assembly: {},
    head: {},
    admin: {},
    activation: {}
  });

 
  const [currentStepValidate, setCurrentStepValidate] = useState(null);

  const steps = [
    'Assembly Information',
    'Head of Assembly Setup',
    'System Administrator Setup', 
    'Activation & Final Setup'
  ];

  const handleNext = async () => {
   
    if (currentStepValidate) {
     
      const isValid = await currentStepValidate();
      if (!isValid) {
        return; 
      }
    }

    setActiveStep((prevStep) => prevStep + 1);
    setCompleted(prev => ({
      ...prev,
      [activeStep]: true
    }));
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleStepChange = (data) => {
    if (!data) return;
    
    setFormData(prev => ({
      ...prev,
      [getStepKey(activeStep)]: data
    }));
  };

  const registerValidation = (validateFn) => {
    setCurrentStepValidate(() => validateFn);
  };

  const getStepKey = (step) => {
    const keys = ['assembly', 'head', 'admin', 'activation'];
    return keys[step];
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AssemblyInfo 
          onNext={handleStepChange} 
          data={formData.assembly}
          registerValidation={registerValidation}
        />;
      case 1: 
        return <HeadSetup 
          onNext={handleStepChange} 
          data={formData.head}
          registerValidation={registerValidation}
        />;
      case 2:
        return <AdminSetup 
          onNext={handleStepChange} 
          data={formData.admin}
          registerValidation={registerValidation}
        />;
      case 3:
        return <FinalSetup 
          onComplete={handleStepChange} 
          data={formData.activation}
          allFormData={formData}
          registerValidation={registerValidation}
        />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md">
      <Fade in timeout={800}>
        <StyledPaper>
          <HeaderSection>
            <Zoom in timeout={600}>
              <Typography 
                variant="h4" 
                align="center" 
                gutterBottom
                sx={{ 
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: 4
                }}
              >
                Assembly Setup
              </Typography>
            </Zoom>

            <StyledStepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </StyledStepper>
          </HeaderSection>

          <ContentSection>
            <Fade in timeout={500} key={activeStep}>
              <div>
                {activeStep === steps.length ? (
                  <Grow in timeout={800}>
                    <Box sx={{ textAlign: 'center' }}>
                      <CheckCircleIcon 
                        sx={{ 
                          fontSize: 60, 
                          color: 'success.main',
                          mb: 2,
                          animation: 'pulse 2s infinite'
                        }} 
                      />
                      <Typography 
                        variant="h5" 
                        color="primary"
                        sx={{ fontWeight: 500 }}
                      >
                        All steps completed - Assembly setup is complete!
                      </Typography>
                    </Box>
                  </Grow>
                ) : (
                  getStepContent(activeStep)
                )}
              </div>
            </Fade>
          </ContentSection>

          {activeStep !== steps.length && (
            <FooterSection>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                sx={{
                  borderRadius: '8px',
                  px: 4,
                  transition: 'all 0.2s ease',
                  '&:not(:disabled):hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  borderRadius: '8px',
                  px: 4,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                  }
                }}
              >
                Continue
              </Button>
            </FooterSection>
          )}

          <style>
            {`
              @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
              }
            `}
          </style>
        </StyledPaper>
      </Fade>
    </Container>
  );
}

export default SetupSteps;