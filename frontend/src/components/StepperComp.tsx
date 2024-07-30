import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Add Questions',
  'Add Topic',
  'Add Chapters',
  'Add Subject',
  'Publish'
];

//@ts-ignore
export default function StepperComp({curresntSteps}) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={curresntSteps} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
