export const getHeaderDescription = (
  currentStep: number,
  successStep: number,
) =>
  currentStep === successStep
    ? 'Slooow is pretty fast, huh?!'
    : 'This is Slooow, but not slooow!';
