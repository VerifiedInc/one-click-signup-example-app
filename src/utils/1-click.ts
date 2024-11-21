import {
  OneClickErrorEnum,
  OneClickPostResponse,
} from '@/types/OneClick.types';

export const getHeaderDescription = (
  currentStep: number,
  successStep: number,
) =>
  currentStep === successStep
    ? 'Slooow is pretty fast, huh?!'
    : 'This is Slooow, but not slooow!';

export const checkHasAdditionalInformationError = (
  response: OneClickPostResponse,
) =>
  'data' in response &&
  response?.data.errorCode ===
    OneClickErrorEnum.ADDITIONAL_INFORMATION_REQUIRED;
