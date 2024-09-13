import React, { memo } from "react";
import { Stack, Step, type StepIconProps, Stepper } from "@mui/material";

import {
  ColorlibConnector,
  ColorlibStepIconRoot,
  StyledLabel,
} from "./steps.styled";
import { ISteps } from "./steps.types";
import { ImageDictionary } from "../../hooks/useLoadedImages";

interface CustomStepIconProps extends StepIconProps {
  stepSrc: string;
  loadedIcons: ImageDictionary;
}

const ColorlibStepIcon: React.FC<CustomStepIconProps> = memo((props) => {
  const { active, completed, className, stepSrc, loadedIcons } = props;

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      <img
        src={loadedIcons[`../../assets/icons/${stepSrc}`]}
        alt={`Step ${props.icon}`}
      />
    </ColorlibStepIconRoot>
  );
});

const Steps: React.FC<ISteps> = memo(
  ({ steps, activePage, activeStep, loadedIcons }) => {
    return (
      <Stack spacing={2} mt={5}>
        {steps.map((pageSteps, pageIndex) => (
          <Stepper
            key={pageIndex}
            alternativeLabel
            activeStep={pageIndex === activePage ? activeStep : -1}
            connector={<ColorlibConnector />}
          >
            {pageSteps.map((step, index) => (
              <Step key={index}>
                <StyledLabel
                  StepIconComponent={(props) => (
                    <ColorlibStepIcon
                      {...props}
                      stepSrc={step.src}
                      loadedIcons={loadedIcons}
                    />
                  )}
                >
                  {step.title}
                </StyledLabel>
              </Step>
            ))}
          </Stepper>
        ))}
      </Stack>
    );
  }
);

export default Steps;
